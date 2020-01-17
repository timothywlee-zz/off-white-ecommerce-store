import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCreditCard = this.handleChangeCreditCard.bind(this);
    this.handleChangeShippingAddress = this.handleChangeShippingAddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.errorTextColorCreditCard = this.errorTextColorCreditCard.bind(this);
    this.displayIconCreditCard = this.displayIconCreditCard.bind(this);
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeCreditCard(event) {
    this.setState({ creditCard: event.target.value });
  }

  handleChangeShippingAddress(event) {
    this.setState({ shippingAddress: event.target.value });
  }

  handleSubmit(event) {
    const { name, creditCard, shippingAddress } = this.state;
    event.preventDefault();
    if (name !== '' && creditCard !== '' && shippingAddress !== '') {
      const addOrder = {
        name: name,
        creditCard: creditCard,
        shippingAddress: shippingAddress
      };
      this.props.placeOrder(addOrder);
    }
  }

  errorTextColorCreditCard() {
    const { creditCard } = this.state;
    const info = parseInt(creditCard);
    if (creditCard.length === 16 && typeof info === 'number' && !(isNaN(creditCard))) {
      return 'text-success';
    } else {
      return 'text-danger';
    }
  }

  displayIconCreditCard() {
    const { creditCard } = this.state;
    const info = parseInt(creditCard);
    if (creditCard.length === 16 && typeof info === 'number' && !(isNaN(creditCard))) {
      return 'fas fa-check ml-1 mt-1';
    } else {
      return 'fas fa-times ml-1 mt-1';
    }
  }

  render() {
    const { name, creditCard, shippingAddress } = this.state;
    const errorTextColorCreditCard = this.errorTextColorCreditCard();
    const displayIcon = this.displayIconCreditCard();
    const errorTextColorName = name ? 'text-success' : 'text-danger';
    const errorTextColorShippingAddress = shippingAddress ? 'text-success' : 'text-danger';
    const displayIconName = name ? 'fas fa-check ml-1 mt-1' : 'fas fa-times ml-1 mt-1';
    const displayIconShippingAddress = shippingAddress ? 'fas fa-check ml-1 mt-1' : 'fas fa-times ml-1 mt-1';

    return (
      <div className='container d-flex flex-column col-12'>
        <div className='mt-5'>
          <h2> My Cart </h2>
          <div className='text-muted font-weight-bold my-4'> Order Total ${this.props.itemTotal} </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className='d-flex flex-column mb-3 form-group'>
            <label className='mb-1'> Name </label>
            <input
              className='form-control'
              type='text'
              value={name}
              onChange={this.handleChangeName} />
            <div className='d-flex flex-row'>
              <div className={errorTextColorName}> Name is required </div>
              <i className={displayIconName}></i>
            </div>
          </div>
          <div className='d-flex flex-column mb-3 form-group'>
            <label className='mb-1'>Credit Card</label>
            <input
              className='form-control'
              type='text'
              value={creditCard}
              placeholder='---- ---- ---- ----'
              onChange={this.handleChangeCreditCard} />
            <div className='d-flex flex-row'>
              <div className={errorTextColorCreditCard}> Must be a valid 16 digit credit card number </div>
              <i className={displayIcon}></i>
            </div>
          </div>
          <div className='d-flex flex-column mb-3 form-group'>
            <label className='mb-1'> Shipping Address</label>
            <textarea
              className='form-control'
              type='text'
              value={shippingAddress}
              onChange={this.handleChangeShippingAddress}>
            </textarea>
            <div className='d-flex flex-row'>
              <div className={errorTextColorShippingAddress}>Shipping address is required </div>
              <i className={displayIconShippingAddress}></i>
            </div>
          </div>
          <div className='d-flex flex-row justify-content-between my-4'>
            <div
              className='text-muted col-2 p-0 d-flex flex-row'
              onClick={() => this.props.setView('catalog', {})}
              style={{ cursor: 'pointer' }}>
              <i className="fas fa-arrow-left mr-1 pt-1"></i>
              <div>{'Continue Shopping'}</div>
            </div>
            <button
              type='button'
              className='btn btn-primary'
              onClick={this.handleSubmit}> Place Order
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
