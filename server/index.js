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

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    return res.status(200).json([]);
  }

  const getAllProductsFromCartSql = `
      SELECT "c"."cartItemId",
             "c"."price",
             "c"."quantity",
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

app.get('/api/images', (req, res, next) => {
  const getImagesSql = `
      SELECT "image1", "image2", "image3", "image4"
        FROM "images"
  `;
  db.query(getImagesSql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

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

app.post('/api/cart/', (req, res, next) => {
  const { productId, quantity } = req.body;
  const idIsValid = productId > 0 && typeof parseInt(productId) === 'number';
  const quantityIsValid = quantity > 0 && typeof parseInt(quantity) === 'number';

  if (!idIsValid || !quantityIsValid) {
    next(new ClientError('productId and quantity must be a positive integer'), 400);
  } else {
    const getProductPriceSql = `
      SELECT "price"
        FROM "products"
       WHERE "productId" = $1
    `;
    const value = [productId];

    db.query(getProductPriceSql, value)
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
                  cartId: cartResult.rows[0].cartId,
                  price: result.rows[0].price
                };
                return createdCart;
              })
          );
        }
      })
      .then(data => {
        const { price, cartId } = data;
        req.session.cartId = cartId;
        const sql = `
          SELECT *
            FROM "cartItems"
           WHERE "cartId" = $1 and "productId" = $2;
        `;
        const values = [cartId, productId];
        return (
          db.query(sql, values)
            .then(result => {
              if (result.rowCount === 0) {
                const sql = `
                  INSERT INTO "cartItems" ("cartId", "productId", "price", "quantity")
                       VALUES ($1, $2, $3, $4)
                    RETURNING "cartItemId";
              `;
                const values = [cartId, productId, price, quantity];
                return db.query(sql, values);
              } else {
                const sql = `
                  UPDATE "cartItems"
                     SET "quantity" = "quantity" + $1
                   WHERE "cartId" = $2 and "productId" = $3
               RETURNING "cartItemId";
              `;
                const values = [quantity, cartId, productId];
                return db.query(sql, values);
              }
            })
        );
      })
      .then(finalData => {
        const finalSql = `
        SELECT "c"."cartItemId",
               "c"."price",
               "c"."quantity",
               "p"."productId",
               "p"."image",
               "p"."name",
               "p"."shortDescription"
          FROM "cartItems" as "c"
          JOIN "products" as "p" using ("productId")
         WHERE "c"."cartItemId" = $1
      `;
        const value = [finalData.rows[0].cartItemId];
        return (
          db.query(finalSql, value)
            .then(data => {
              return res.status(201).json(data.rows);
            })
            .catch(err => {
              console.error(err);
              return next(err);
            })
        );
      })
      .catch(err => next(err));
  }
});

app.post('/api/orders', (req, res, next) => {
  const { fullName, email, phone, creditCard, expirationDate, cvv, shippingAddress } = req.body;

  if (!req.session.cartId) {
    throw (new ClientError('Cannot find cartId', 400));
  }

  if (!(fullName && email && phone && creditCard && expirationDate && cvv && shippingAddress)) {
    throw (new ClientError('Cannot find all information', 400));
  }

  const addAnOrder = `
        INSERT INTO "orders" ("cartId", "fullName", "email", "phone", "creditCard", "expirationDate", "cvv", "shippingAddress")
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *
  `;

  const values = [req.session.cartId, fullName, email, phone, creditCard, expirationDate, cvv, shippingAddress];

  db.query(addAnOrder, values)
    .then(result => {
      delete req.session.cartId;
      res.status(201).json({
        orderId: result.rows[0].orderId,
        createdAt: result.rows[0].createdAt,
        fullName: result.rows[0].fullName,
        email: result.rows[0].email,
        phone: result.rows[0].phone,
        creditCard: result.rows[0].creditCard,
        expirationDate: result.rows[0].expirationDate,
        cvv: result.rows[0].cvv,
        shippingAddress: result.rows[0].shippingAddress
      });
    });
});

app.put('/api/cart', (req, res, next) => {
  const { quantity, cartItemId } = req.body;
  if (!quantity || !cartItemId) {
    next(new ClientError('Quantity and cartItemId must be a positive integer', 400));
  }
  const sql = `
      UPDATE "cartItems"
         SET "quantity" = $1
       WHERE "cartItemId" = $2
   RETURNING *;
  `;
  const values = [quantity, cartItemId];
  db.query(sql, values)
    .then(result => {
      const updatedItem = result.rows[0];
      if (!updatedItem) {
        next(new ClientError('Cannot find a product with that Id', 400));
      }
      const sql = `
          SELECT "c"."cartItemId",
                 "c"."price",
                 "c"."quantity",
                 "p"."productId",
                 "p"."image",
                 "p"."name",
                 "p"."shortDescription"
            FROM "cartItems" as "c"
            JOIN "products" as "p" using ("productId")
           WHERE "c"."cartItemId" = $1
      `;
      const value = [cartItemId];
      return (
        db.query(sql, value)
          .then(result => {
            res.status(200).json(result.rows[0]);
          })
      );
    })
    .catch(err => next(err));
});

app.post('/api/emailSub', (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    throw (new ClientError(`Cannot find the email=${email}`, 400));
  }

  const sql = `
    INSERT INTO "emailSubs" ("email")
         VALUES ($1)
      RETURNING *
  `;

  const values = [email];
  db.query(sql, values)
    .then(response => res.status(201).json({
      message: 'Email has been added to monthly subscriptions'
    }))
    .catch(err => next(err));
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
