require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const getAllProductsSql = `
    SELECT "productId", "name", "price", "image", "shortDescription"
      FROM "products"
    `;
  db.query(getAllProductsSql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId);

  if (productId < 0 || isNaN(productId)) {
    res.status(400).json({
      error: 'id must be a positive integer'
    });
  } else {
    const getAllProductsSql = `
    SELECT *
      FROM "products"
     WHERE "productId" = $1
  `;
    const value = [productId];
    db.query(getAllProductsSql, value)
      .then(result => {
        if (!result.rows[0]) {
          next(new ClientError(`cannot ${req.method}/find id ${productId}`), 404);
        } else {
          return res.json(result.rows[0]);
        }
      })
      .catch(err => next(err));
  }
});
// GET endpoint for /api/cart
app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    return res.status(200).json([]);
  }

  const getAllProductsFromCartSql = `
      SELECT "c"."cartItemId",
             "c"."price",
             "p"."productId",
             "p"."image",
             "p"."name",
             "p"."shortDescription"
        FROM "cartItems" as "c"
        JOIN "products" as "p" using ("productId")
       WHERE "c"."cartId" = $1
  `;
  const value = [req.session.cartId];

  db.query(getAllProductsFromCartSql, value)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

// DELETE endpoint for /api/cart
app.delete('/api/cart/:cartItemId', (req, res, next) => {
  const deleteId = parseInt(req.params.cartItemId);

  if (deleteId < 0 || isNaN(deleteId)) {
    throw (new ClientError(`cartItemId=${deleteId} must be a positive integer`, 400));
  } else {
    const deleteAnItemSql = `
      DELETE FROM "cartItems"
            WHERE "cartItemId" = $1
    `;
    const value = [deleteId];
    db.query(deleteAnItemSql, value)
      .then(result => {
        const item = result.rowCount;
        if (!item) {
          next(new ClientError(`Unable to find cartItemId=${deleteId}`));
        } else {
          return res.status(201).json(item);
        }
      })
      .catch(err => {
        console.error(err);
        next(new ClientError('An unexpected error occured.'));
      });
  }
});

// POST endpoint for /api/cart
app.post('/api/cart/', (req, res, next) => {
  const { productId } = req.body;

  if (productId < 0 || isNaN(productId)) {
    next(new ClientError(`productId=${productId} must be a positive integer`), 400);
  }

  const getProductPriceSql = `
      SELECT "price"
        FROM "products"
       WHERE "productId" = $1
    `;
  const value = [productId];

  db.query(getProductPriceSql, value)
    // 1. .then()
    .then(result => {
      if (result.rows.length < 0) {
        throw (new ClientError(`Cannot find a product with the productId=${productId}`, 400));
      }

      if (req.session.cartId) {
        const cart = {
          cartId: req.session.cartId,
          price: result.rows[0].price
        };
        return cart;
      } else {
        const addACart = `
        INSERT INTO "carts" ("cartId", "createdAt")
             VALUES (default, default)
          RETURNING "cartId"
      `;
        return (
          db.query(addACart)
            .then(cartResult => {
              const createdCart = {
                cartId: cartResult.rows[0].cartId, // from cartResult
                price: result.rows[0].price // from result from above
              };
              return createdCart;
            })
        );
      }
    })
    // 2. .then()
    .then(data => {
      req.session.cartId = data.cartId;

      const newCartRow = `
        INSERT INTO "cartItems" ("cartId", "productId", "price")
             VALUES ($1, $2, $3)
          RETURNING "cartItemId"
      `;
      const values = [data.cartId, productId, data.price];
      return (
        db.query(newCartRow, values)
          .then(result => {
            return {
              cartItemId: result.rows[0].cartItemId
            };
          })
      );
    })
    // 3. .then()
    .then(finalData => {
      const finalSql = `
        SELECT "c"."cartItemId",
               "c"."price",
               "p"."productId",
               "p"."image",
               "p"."name",
               "p"."shortDescription"
          FROM "cartItems" as "c"
          JOIN "products" as "p" using ("productId")
         WHERE "c"."cartItemId" = $1
      `;
      const value = [finalData.cartItemId];
      return (
        db.query(finalSql, value)
          .then(data => {
            return res.status(201).json(data.rows[0]);
          })
      );
    })

    .catch(err => next(err));
});

// POST endpoint to /api/orders
app.post('/api/orders', (req, res, next) => {
  const { name, creditCard, shippingAddress } = req.body;

  if (!req.session.cartId) {
    throw (new ClientError('Cannot find cartId', 400));
  }

  if (!(name && creditCard && shippingAddress)) {
    throw (new ClientError(`Cannot find all name=${name}, creditCard=${creditCard}, and shippingAddress=${shippingAddress}`, 400));
  }

  const addAnOrder = `
        INSERT INTO "orders" ("cartId", "name", "creditCard", "shippingAddress")
             VALUES ($1, $2, $3, $4)
          RETURNING *
      `;

  const values = [req.session.cartId, name, creditCard, shippingAddress];

  db.query(addAnOrder, values)
    .then(result => {
      delete req.session.cartId;
      res.status(201).json({
        orderId: result.rows[0].orderId,
        createdAt: result.rows[0].createdAt,
        name: result.rows[0].name,
        creditCard: result.rows[0].creditCard,
        shippingAddress: result.rows[0].shippingAddress
      });
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
