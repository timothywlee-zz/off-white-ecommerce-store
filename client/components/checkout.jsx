import React from 'react';
import CheckoutSummaryItem from './checkout-summary-item';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      creditCard: '',
      month: '',
      year: '',
      cvv: '',
      agreementTerms: false,
      validation: {
        fullName: true,
        phone: true,
        email: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        creditCard: true,
        month: true,
        year: true,
        cvv: true,
        agreementTerms: true
      },
      validFormComplete: false
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.validation = this.validation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.taxCalculation = this.taxCalculation.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.showButtonIfFormValid = this.showButtonIfFormValid.bind(this);
    this.checkValidOrder = this.checkValidOrder.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  inputHandler(event) {
    const form = { ...this.state.validation };
    const value = event.target.value;
    const validateNumbers = RegExp(/^[0-9]*$/);

    switch (event.target.name) {
      case 'fullName':
        this.setState({ fullName: value });
        form.fullName = true;
        break;
      case 'phone':
        if (validateNumbers.test(value)) {
          this.setState({ phone: value });
        }
        form.phone = true;
        break;
      case 'email':
        this.setState({ email: value });
        form.email = true;
        break;
      case 'address':
        this.setState({ address: value });
        form.address = true;
        break;
      case 'city':
        this.setState({ city: value });
        form.city = true;
        break;
      case 'state':
        this.setState({ state: value });
        form.state = true;
        break;
      case 'zipCode':
        if (validateNumbers.test(value)) {
          this.setState({ zipCode: value });
        }
        form.zipCode = true;
        break;
      case 'creditCard':
        if (validateNumbers.test(value)) {
          this.setState({ creditCard: value });
        }
        form.creditCard = true;
        break;
      case 'month':
        this.setState({ month: value });
        form.month = true;
        break;
      case 'year':
        this.setState({ year: value });
        form.year = true;
        break;
      case 'cvv':
        if (validateNumbers.test(value)) {
          this.setState({ cvv: value });
        }
        form.cvv = true;
        break;
      case 'agreementTerms':
        this.setState({ agreementTerms: !this.state.agreementTerms });
        form.agreementTerms = true;
        break;
    }
    this.setState({ validation: form });
    setTimeout(this.checkValidOrder, 200);
  }

  validation() {
    const { fullName, phone, email, address, city, state, zipCode, creditCard, month, year, cvv, agreementTerms } = this.state;
    const formValidation = { ...this.state.validation };
    const validateName = new RegExp(/^[a-zA-Z ,'-]{5,65}$/);
    const validateEmail = new RegExp(/^([a-zA-Z\d.-_]{1,64})@([a-z\d-]{1,227})\.([a-z]{2,28})$/);

    switch (event.target.name) {
      case 'fullName':
        if (!validateName.test(fullName.trim())) {
          formValidation.fullName = false;
        }
        break;
      case 'phone':
        if (phone.length < 10) {
          formValidation.phone = false;
        }
        break;
      case 'email':
        if (!validateEmail.test(email.trim())) {
          formValidation.email = false;
        }
        break;
      case 'address':
        if (address.length < 6) {
          formValidation.address = false;
        }
        break;
      case 'city':
        if (city.length < 3) {
          formValidation.city = false;
        }
        break;
      case 'state':
        if (state.length < 2) {
          formValidation.state = false;
        }
        break;
      case 'zipCode':
        if (zipCode.length < 5) {
          formValidation.zipCode = false;
        }
        break;
      case 'creditCard':
        if (creditCard.length < 16) {
          formValidation.creditCard = false;
        }
        break;
      case 'month':
        if (month.length < 2) {
          formValidation.month = false;
        }
        break;
      case 'year':
        if (year.length < 2) {
          formValidation.year = false;
        }
        break;
      case 'cvv':
        if (cvv.length < 3) {
          formValidation.cvv = false;
        }
        break;
      case 'agreementTerms':
        if (!agreementTerms) {
          formValidation.agreementTerms = false;
        }
        break;
    }

    if (Object.values(formValidation).indexOf(false) === -1 && (Object.values(this.state).indexOf('') === -1 || Object.values(this.state).indexOf('') === 15)) {
      this.setState({
        validation: formValidation,
        validFormComplete: true
      });
    } else {
      this.setState({
        validation: formValidation,
        validFormComplete: false
      });
    }
  }

  checkValidOrder() {
    const { fullName, phone, email, address, city, state, zipCode, creditCard, month, year, cvv, agreementTerms } = this.state;
    const validForm = { ...this.state.validation };
    const validateName = RegExp(/^[a-zA-Z ,'-]{5,65}$/);
    const validateEmail = RegExp(/^([a-zA-Z\d.-_]{1,64})@([a-z\d-]{1,227})\.([a-z]{2,28})$/);

    if (!validateName.test(fullName.trim())) {
      validForm.fullName = false;
    }
    if (phone.length < 10) {
      validForm.phone = false;
    }
    if (!validateEmail.test(email.trim())) {
      validForm.email = false;
    }
    if (address.length < 6) {
      validForm.address = false;
    }
    if (city.length < 3) {
      validForm.city = false;
    }
    if (state.length < 2) {
      validForm.state = false;
    }
    if (zipCode.length < 5) {
      validForm.zipCode = false;
    }
    if (creditCard.length < 16) {
      validForm.creditCard = false;
    }
    if (month.length < 2) {
      validForm.month = false;
    }
    if (year.length < 2) {
      validForm.year = false;
    }
    if (cvv.length < 3) {
      validForm.cvv = false;
    }
    if (!agreementTerms) {
      validForm.agreementTerms = false;
    }
    if (Object.values(validForm).indexOf(false) === -1) {
      this.setState({
        validFormComplete: true
      });
    } else {
      this.setState({
        validFormComplete: false
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { fullName, phone, email, address, city, state, zipCode, creditCard, month, year, cvv, agreementTerms } = this.state;
    const formValidation = { ...this.state.validation };
    const validateName = RegExp(/^[a-zA-Z ,'-]{5,65}$/);
    const validateEmail = RegExp(/^([a-zA-Z\d.-_]{1,64})@([a-z\d-]{1,227})\.([a-z]{2,28})$/);

    if (!validateName.test(fullName)) {
      formValidation.fullName = false;
    }
    if (phone.length < 10) {
      formValidation.phone = false;
    }
    if (!validateEmail.test(email)) {
      formValidation.email = false;
    }
    if (address.length < 6) {
      formValidation.address = false;
    }
    if (city.length < 3) {
      formValidation.city = false;
    }
    if (state.length < 2) {
      formValidation.state = false;
    }
    if (zipCode.length < 5) {
      formValidation.zipCode = false;
    }
    if (creditCard.length < 16) {
      formValidation.creditCard = false;
    }
    if (month.length < 2) {
      formValidation.month = false;
    }
    if (year.length < 2) {
      formValidation.year = false;
    }
    if (cvv.length < 3) {
      formValidation.cvv = false;
    }
    if (!agreementTerms) {
      formValidation.agreementTerms = false;
    }

    if (Object.values(formValidation).indexOf(false) === -1) {
      const addOrder = {
        fullName: fullName.trim(),
        email: email,
        phone: phone,
        creditCard: creditCard,
        expirationDate: `${month}/${year}`,
        cvv: cvv,
        shippingAddress: `${address.trim()} ${city.trim()} ${state} ${zipCode}`
      };
      setTimeout(() => {
        this.props.placeOrder(addOrder);
      }, 200);
      setTimeout(() => {
        this.props.resetCartLength();
      }, 200);
    } else {
      this.setState({
        validation: formValidation
      });
    }
  }

  taxCalculation() {
    const tax = (this.props.itemTotal * 0.0725).toFixed(2);
    return tax;
  }

  calculateTotal() {
    const total = (this.props.itemTotal * 1.0725).toFixed(2);
    return total;
  }

  createListOfItemsInCart() {
    const cartItemArray = this.props.itemsInCart;
    let cartItemArrayDisplay = null;
    if (cartItemArray.length !== 0) {
      cartItemArrayDisplay = cartItemArray.map(product => {
        return (
          <CheckoutSummaryItem
            key={product.cartItemId}
            product={product}
            quantity={product.quantity}
            getCartItems={this.props.getCartItems} />
        );
      });
    }
    return cartItemArrayDisplay;
  }

  showButtonIfFormValid() {
    if (this.state.validFormComplete) {
      return (
        <button
          className='d-flex btn btn-outline-primary justify-content-center mb-1'
          onClick={this.handleSubmit}
          style={{ cursor: 'pointer', width: '100%' }}> Process Order
        </button>
      );
    } else {
      return (
        <div
          className='d-flex btn btn-outline-dark justify-content-center mb-1'
          style={{ cursor: 'pointer', width: '100%' }}>
          Process Order
        </div>
      );
    }
  }

  render() {
    const { fullName, phone, address, city, zipCode, creditCard, cvv, validation } = this.state;
    const left = { width: '50%', textAlign: 'left' };
    const right = { width: '50%', textAlign: 'right' };

    return (
      <div className='container checkoutContainer'>
        <div className='row'>
          <div className='col-sm-8'>
            <form
              className='p-3'
              onSubmit={this.handleSubmit}
              noValidate>
              <div className='form-group'>
                <h4> Shipping Address</h4>
              </div>
              <div className='form-group'>
                <label
                  htmlFor='name'
                  className='text-secondary'> Full Name
                </label>
                <input
                  type='text'
                  name='fullName'
                  className={`form-control ${validation.fullName ? '' : 'is-invalid'}`}
                  onChange={this.inputHandler}
                  onBlur={this.validation}
                  value={fullName}/>
                <div className='invalid-feedback'>
                  <small> Full Name is Required - Must be at least 5 letters</small>
                </div>
              </div>
              <div className='form-row'>
                <div className='form-group col-md-6'>
                  <label
                    htmlFor="email"
                    className='text-secondary'> Email
                  </label>
                  <input
                    type="email"
                    name='email'
                    onChange={this.inputHandler}
                    onBlur={this.validation}
                    className={`form-control ${validation.email ? '' : 'is-invalid'}`}/>
                  <div className='invalid-feedback'>
                    <small>Invalid Email Address  (e.g. me@mydomain.com)</small>
                  </div>
                </div>
                <div className='form-group col-md-6'>
                  <label
                    htmlFor='name'
                    className='text-secondary'> Phone
                  </label>
                  <input
                    type='tel'
                    name='phone'
                    className={`form-control ${validation.phone ? '' : 'is-invalid'}`}
                    onChange={this.inputHandler}
                    onBlur={this.validation}
                    value={phone}
                    minLength='10'
                    maxLength='11' />
                  <div className='invalid-feedback'>
                    <small>Invalid Phone Number - Must be at least 10 numbers</small>
                  </div>
                </div>
              </div>
              <div className='form-row'>
                <div className='form-group col-md-12'>
                  <label
                    htmlFor='inputAddress'
                    className='text-secondary'> Address
                  </label>
                  <input
                    type='text'
                    name='address'
                    onChange={this.inputHandler}
                    onBlur={this.validation}
                    value={address}
                    className={`form-control ${validation.address ? '' : 'is-invalid'}`} />
                  <div className='invalid-feedback'>
                    <small>Invalid Street Address - Must be at least 6 characters</small>
                  </div>
                </div>
              </div>
              <div className='form-row'>
                <div className='form-group col-md-6'>
                  <label
                    htmlFor='inputCity'
                    className='text-secondary'> City
                  </label>
                  <input
                    type='text'
                    name='city'
                    className={`form-control ${validation.city ? '' : 'is-invalid'}`}
                    onChange={this.inputHandler}
                    onBlur={this.validation}
                    value={city} />
                  <div className='invalid-feedback'>
                    <small>Invalid City - Must be at least 3 letters</small>
                  </div>
                </div>
                <div className='form-group col-md-3'>
                  <label
                    htmlFor='inputState'
                    className='text-secondary'> State
                  </label>
                  <select
                    className={`form-control ${validation.state ? '' : 'is-invalid'}`}
                    name='state'
                    onChange={this.inputHandler}
                    onBlur={this.validation}>
                    <option defaultValue hidden></option>
                    <option value='AL'>Alabama</option>
                    <option value='AK'>Alaska</option>
                    <option value='AZ'>Arizona</option>
                    <option value='AR'>Arkansas</option>
                    <option value='CA'>California</option>
                    <option value='CO'>Colorado</option>
                    <option value='CT'>Connecticut</option>
                    <option value='DE'>Delaware</option>
                    <option value='DC'>District Of Columbia</option>
                    <option value='FL'>Florida</option>
                    <option value='GA'>Georgia</option>
                    <option value='HI'>Hawaii</option>
                    <option value='ID'>Idaho</option>
                    <option value='IL'>Illinois</option>
                    <option value='IN'>Indiana</option>
                    <option value='IA'>Iowa</option>
                    <option value='KS'>Kansas</option>
                    <option value='KY'>Kentucky</option>
                    <option value='LA'>Louisiana</option>
                    <option value='ME'>Maine</option>
                    <option value='MD'>Maryland</option>
                    <option value='MA'>Massachusetts</option>
                    <option value='MI'>Michigan</option>
                    <option value='MN'>Minnesota</option>
                    <option value='MS'>Mississippi</option>
                    <option value='MO'>Missouri</option>
                    <option value='MT'>Montana</option>
                    <option value='NE'>Nebraska</option>
                    <option value='NV'>Nevada</option>
                    <option value='NH'>New Hampshire</option>
                    <option value='NJ'>New Jersey</option>
                    <option value='NM'>New Mexico</option>
                    <option value='NY'>New York</option>
                    <option value='NC'>North Carolina</option>
                    <option value='ND'>North Dakota</option>
                    <option value='OH'>Ohio</option>
                    <option value='OK'>Oklahoma</option>
                    <option value='OR'>Oregon</option>
                    <option value='PA'>Pennsylvania</option>
                    <option value='RI'>Rhode Island</option>
                    <option value='SC'>South Carolina</option>
                    <option value='SD'>South Dakota</option>
                    <option value='TN'>Tennessee</option>
                    <option value='TX'>Texas</option>
                    <option value='UT'>Utah</option>
                    <option value='VT'>Vermont</option>
                    <option value='VA'>Virginia</option>
                    <option value='WA'>Washington</option>
                    <option value='WV'>West Virginia</option>
                    <option value='WI'>Wisconsin</option>
                    <option value='WY'>Wyoming</option>
                  </select>
                  <div className='invalid-feedback'>
                    <small>Select A State</small>
                  </div>
                </div>
                <div className='form-group col-md-3'>
                  <label
                    htmlFor='inputZip'
                    className='text-secondary'> Zip
                  </label>
                  <input
                    type='tel'
                    name='zipCode'
                    className={`form-control ${validation.zipCode ? '' : 'is-invalid'}`}
                    onChange={this.inputHandler}
                    onBlur={this.validation}
                    value={zipCode}
                    minLength='5'
                    maxLength='5' />
                  <div className='invalid-feedback'>
                    <small>Invalid Zipcode - Must be 5 numbers</small>
                  </div>
                </div>
              </div>
              <div className='form-group mt-2'>
                <h4>Payment Details</h4>
              </div>
              <div className='form-row mb-3'>
                <div className='form-group col-md-6'>
                  <label
                    htmlFor='creditCard'
                    className='text-secondary'> Credit Card Number
                  </label>
                  <input
                    type='tel'
                    name='creditCard'
                    className={`form-control ${validation.creditCard ? '' : 'is-invalid'}`}
                    minLength='16'
                    maxLength='16'
                    onChange={this.inputHandler}
                    onBlur={this.validation}
                    value={creditCard} />
                  <div className='invalid-feedback'>
                    <small>Invalid Credit Card Number - Must be exactly 16 numbers </small>
                  </div>
                </div>
                <div className='form-group col-md-2'>
                  <label
                    htmlFor='inputState'
                    className='text-secondary'> Month
                  </label>
                  <select
                    className={`form-control ${validation.month ? '' : 'is-invalid'}`}
                    name='month'
                    onChange={this.inputHandler}
                    onBlur={this.validation}>
                    <option defaultValue hidden></option>
                    <option value='01'>01</option>
                    <option value='02'>02</option>
                    <option value='03'>03</option>
                    <option value='04'>04</option>
                    <option value='05'>05</option>
                    <option value='06'>06</option>
                    <option value='07'>07</option>
                    <option value='08'>08</option>
                    <option value='09'>09</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                  </select>
                  <div className='invalid-feedback'>
                    <small>Select a month </small>
                  </div>
                </div>
                <div className='form-group col-md-2'>
                  <label
                    htmlFor='inputState'
                    className='text-secondary'> Year
                  </label>
                  <select
                    className={`form-control ${validation.year ? '' : 'is-invalid'}`}
                    name='year'
                    onChange={this.inputHandler}
                    onBlur={this.validation}>
                    <option defaultValue hidden></option>
                    <option value='2020'>2020</option>
                    <option value='2021'>2021</option>
                    <option value='2022'>2022</option>
                    <option value='2023'>2023</option>
                    <option value='2024'>2024</option>
                    <option value='2025'>2025</option>
                    <option value='2026'>2026</option>
                    <option value='2027'>2027</option>
                    <option value='2028'>2028</option>
                    <option value='2029'>2029</option>
                    <option value='2030'>2030</option>
                  </select>
                  <div className='invalid-feedback'>
                    <small>Select A Year</small>
                  </div>
                </div>
                <div className='form-group col-md-2'>
                  <label
                    htmlFor='inputZip'
                    className='text-secondary'> CVV
                  </label>
                  <input
                    type='tel'
                    name='cvv'
                    className={`form-control ${validation.cvv ? '' : 'is-invalid'}`}
                    onChange={this.inputHandler}
                    onBlur={this.validation}
                    value={cvv}
                    minLength='3'
                    maxLength='4' />
                  <div className='invalid-feedback'>
                    <small>Invalid CVV - <br/> Must be at least 3 numbers</small>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input className={`form-check-input ${validation.agreementTerms ? '' : 'is-invalid'}`}
                    name="agreementTerms"
                    type="checkbox"
                    id="gridCheck"
                    onChange={this.inputHandler}
                    onBlur={this.validation}/>
                  <label
                    className="form-check-label"
                    htmlFor="gridCheck">
                    I accept that this website is simply a demo site and not a real e-commerce store. <br/> I accept that no payment processing will be done, and that real personal information should not be used on submission of this form.
                  </label>
                  <div className="invalid-feedback">
                    <small>Terms are required</small>
                  </div>
                </div>
              </div>
              <div
                className='d-flex justify-content-center align-items-center flex-column'
                style={{ padding: '0 25%' }}>
                {this.showButtonIfFormValid()}
                <button
                  className='d-flex btn btn-outline-dark justify-content-center'
                  onClick={() => this.props.setView('cart', {})}
                  style={{ cursor: 'pointer', width: '100%' }}> Back To Cart
                </button>
              </div>
            </form>
          </div>
          <div className='col-sm-4'>
            <h2 style={{ borderBottom: '1px solid #D3D3D3', textAlign: 'left', marginBottom: '0' }}> Summary
            </h2>
            <div className='d-flex flex-column py-3' style={{ borderBottom: '1px solid #D3D3D3' }}>
              <div className='d-flex flex-row ' >
                <div style={left}> Subtotal </div>
                <div style={right}> ${this.props.itemTotal} </div>
              </div>
              <div className='d-flex flex-row'>
                <div style={left}> Shipping </div>
                <div style={right}> FREE </div>
              </div>
              <div className='d-flex flex-row'>
                <div style={left}> Tax </div>
                <div style={right}> ${this.taxCalculation()} </div>
              </div>
            </div>
            <div className='d-flex flex-row mt-3'>
              <h4 style={left}> TOTAL </h4>
              <h4 style={right}> ${this.calculateTotal()} </h4>
            </div>
            {this.createListOfItemsInCart()}
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
