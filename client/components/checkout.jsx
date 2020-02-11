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
      validFullName: false,
      validPhone: false,
      validEmail: false,
      validAddress: false,
      validCity: false,
      validState: false,
      validZipCode: false,
      validCreditCard: false,
      validMonth: false,
      validYear: false,
      validCvv: false,
      validAgreementTerms: false
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.taxCalculation = this.taxCalculation.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.showButtonIfInfoValid = this.showButtonIfInfoValid.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  inputHandler(event) {
    const validateNumbers = RegExp(/^[0-9]*$/);
    const target = event.target.name;

    switch (target) {
      case 'fullName':
      case 'address':
      case 'city':
        if (event.target.value.indexOf('  ') === -1) {
          this.setState({ [target]: event.target.value });
        }
        break;
      case 'phone':
      case 'creditCard':
      case 'zipCode':
      case 'cvv':
        if (validateNumbers.test(event.target.value)) {
          this.setState({ [target]: event.target.value });
        }
        break;
      case 'agreementTerms':
        this.setState({ agreementTerms: !this.state.agreementTerms });
        break;
      default:
        this.setState({ [target]: event.target.value });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { fullName, phone, email, address, city, state, zipCode, creditCard, month, year, cvv, agreementTerms } = this.state;
    if (fullName !== prevState.fullName) {
      this.validateUserInformation();
    } else if (phone !== prevState.phone) {
      this.validateUserInformation();
    } else if (email !== prevState.email) {
      this.validateUserInformation();
    } else if (address !== prevState.address) {
      this.validateUserInformation();
    } else if (city !== prevState.city) {
      this.validateUserInformation();
    } else if (state !== prevState.state) {
      this.validateUserInformation();
    } else if (zipCode !== prevState.zipCode) {
      this.validateUserInformation();
    } else if (creditCard !== prevState.creditCard) {
      this.validateUserInformation();
    } else if (month !== prevState.month) {
      this.validateUserInformation();
    } else if (year !== prevState.year) {
      this.validateUserInformation();
    } else if (cvv !== prevState.cvv) {
      this.validateUserInformation();
    } else if (agreementTerms !== prevState.agreementTerms) {
      this.validateUserInformation();
    }
  }

  validateUserInformation() {
    const { fullName, phone, email, address, city, state, zipCode, creditCard, month, year, cvv, agreementTerms } = this.state;
    const validateName = RegExp(/^[a-zA-Z ,'-]{5,65}$/);
    const validateEmail = RegExp(/^([a-zA-Z\d.-_]{1,64})@([a-z\d-]{1,227})\.([a-z]{2,28})$/);
    console.log('fullName: ', this.state.validFullName);
    console.log('phone: ', this.state.validPhone);
    console.log('email: ', this.state.validEmail);
    console.log('address: ', this.state.validAddress);
    console.log('city: ', this.state.validCity);
    console.log('state: ', this.state.validState);
    console.log('zipCode: ', this.state.validZipCode);
    console.log('creditCard: ', this.state.validCreditCard);
    console.log('month: ', this.state.validMonth);
    console.log('year: ', this.state.validYear);
    console.log('cvv: ', this.state.validCvv);
    console.log('agreementTerms: ', this.state.agreementTerms);

    switch (event.target.name) {
      case 'fullName':
        if (fullName.length < 5 || !validateName.test(fullName)) {
          this.setState({ validFullName: false });
        } else {
          this.setState({ validFullName: true });
        }
        break;
      case 'phone':
        if (phone.length < 10) {
          this.setState({ validPhone: false });
        } else {
          this.setState({ validPhone: true });
        }
        break;
      case 'email':
        if (!validateEmail.test(email)) {
          this.setState({ validEmail: false });
        } else {
          this.setState({ validEmail: true });
        }
        break;
      case 'address':
        if (address.length < 6) {
          this.setState({ validAddress: false });
        } else {
          this.setState({ validAddress: true });
        }
        break;
      case 'city':
        if (city.length < 3) {
          this.setState({ validCity: false });
        } else {
          this.setState({ validCity: true });
        }
        break;
      case 'state':
        if (state.length < 2) {
          this.setState({ validState: false });
        } else {
          this.setState({ validState: true });
        }
        break;
      case 'zipCode':
        if (zipCode.length < 5) {
          this.setState({ validZipCode: false });
        } else {
          this.setState({ validZipCode: true });
        }
        break;
      case 'creditCard':
        if (creditCard.length < 16) {
          this.setState({ validCreditCard: false });
        } else {
          this.setState({ validCreditCard: true });
        }
        break;
      case 'month':
        if (month.length < 2) {
          this.setState({ validMonth: false });
        } else {
          this.setState({ validMonth: true });
        }
        break;
      case 'year':
        if (year.length < 2) {
          this.setState({ validYear: false });
        } else {
          this.setState({ validYear: true });
        }
        break;
      case 'cvv':
        if (cvv.length < 3) {
          this.setState({ validCvv: false });
        } else {
          this.setState({ validCvv: true });
        }
        break;
      case 'agreementTerms':
        if (!agreementTerms) {
          this.setState({ validAgreementTerms: false });
        } else {
          this.setState({ validAgreementTerms: true });
        }
    }

  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      fullName, phone, email, address, city, state, zipCode, creditCard, month, year, cvv, agreementTerms,
      validFullName, validPhone, validEmail, validAddress, validCity,
      validState, validZipCode, validCreditCard, validMonth, validYear,
      validCvv, validAgreementTerms
    } = this.state;

    if (fullName && phone && email && address && city && state && zipCode && creditCard && month && year && cvv && agreementTerms) { // change this, no longer an object
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
      console.log(this.state.fullName);
      this.setState({
        fullName: fullName.trim(),
        address: address.trim(),
        city: city.trim(),
        agreementTerms: agreementTerms,
        validFullName: validFullName,
        validPhone: validPhone,
        validEmail: validEmail,
        validAddress: validAddress,
        validCity: validCity,
        validState: validState,
        validZipCode: validZipCode,
        validCreditCard: validCreditCard,
        validMonth: validMonth,
        validYear: validYear,
        validCvv: validCvv,
        validAgreementTerms: validAgreementTerms
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

  showButtonIfInfoValid() {
    const {
      validFullName, validEmail, validPhone, validAddress, validCity,
      validState, validZipCode, validCreditCard, validMonth, validYear,
      validCvv, validAgreementTerms
    } = this.state;

    if (validFullName && validPhone && validEmail && validAddress && validCity &&
         validState && validZipCode && validCreditCard && validMonth && validYear &&
        validCvv && validAgreementTerms) {
      return (
        <button
          className='d-flex btn btn-outline-primary justify-content-center mb-1'
          onClick={this.handleSubmit}
          style={{ cursor: 'pointer', width: '100%' }}> Process Order
        </button>
      );
    } else {
      console.log('this happened');

      return (
        <button
          className='d-flex btn btn-outline-danger justify-content-center mb-1'
          onClick={this.handleSubmit}
          style={{ cursor: 'pointer', width: '100%' }}>
          Process Order
        </button>
      );
    }
  }

  render() {
    const {
      fullName, phone, email, address, city, state, zipCode, creditCard, month, year, cvv,
      agreementTerms, validFullName, validPhone, validEmail, validAddress, validCity, validState,
      validZipCode, validCreditCard, validMonth, validYear, validCvv, validAgreementTerms
    } = this.state;
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
                  autoComplete='new-password'
                  name='fullName'
                  className={`form-control ${validFullName ? '' : 'is-invalid'} border`}
                  onChange={this.inputHandler}
                  value={fullName}
                  minLength='5'
                  maxLength='65' />
                <div className='invalid-feedback'>
                  {fullName.length < 5 && fullName !== '' ? <small> Full Name is Required </small> : null}
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
                    autoComplete="new-password"
                    name='email'
                    onChange={this.inputHandler}
                    className={`form-control ${validEmail ? '' : 'is-invalid'} border`}
                    minLength="6"
                    maxLength="254" />
                  <div className='invalid-feedback'>
                    {!validEmail && email !== '' ? <small>Invalid email address  (e.g. me@mydomain.com)</small> : null}
                  </div>
                </div>
                <div className='form-group col-md-6'>
                  <label
                    htmlFor='name'
                    className='text-secondary'> Phone
                  </label>
                  <input
                    type='tel'
                    autoComplete='new-password'
                    name='phone'
                    className={`form-control ${validPhone ? '' : 'is-invalid'} border`}
                    onChange={this.inputHandler}
                    value={phone}
                    minLength='10'
                    maxLength='11' />
                  <div className='invalid-feedback'>
                    {!validPhone && phone !== '' ? <small>Invalid phone number</small> : null}
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
                    autoComplete='new-password'
                    name='address'
                    onChange={this.inputHandler}
                    value={address}
                    minLength='6'
                    maxLength='42'
                    className={`form-control ${validAddress ? '' : 'is-invalid'} border`} />
                  <div className='invalid-feedback'>
                    {!validAddress && address !== '' ? <small>Invalid street address</small> : null}
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
                    autoComplete='new-password'
                    name='city'
                    className={`form-control ${validCity ? '' : 'is-invalid'} border`}
                    onChange={this.inputHandler}
                    value={city}
                    minLength='3'
                    maxLength='50' />
                  <div className='invalid-feedback'>
                    {city.length < 3 && city !== '' ? <small>Invalid City - Must be at least 3 letters</small> : null}
                  </div>
                </div>
                <div className='form-group col-md-3'>
                  <label
                    htmlFor='inputState'
                    className='text-secondary'> State
                  </label>
                  <select
                    className={`form-control ${validState ? '' : 'is-invalid'} border`}
                    name='state'
                    onChange={this.inputHandler}>
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
                    {!validState && state !== '' ? <small>Select a state</small> : null}
                  </div>
                </div>
                <div className='form-group col-md-3'>
                  <label
                    htmlFor='inputZip'
                    className='text-secondary'> Zip
                  </label>
                  <input
                    type='tel'
                    autoComplete='new-password'
                    name='zipCode'
                    className={`form-control ${validZipCode ? '' : 'is-invalid'} border`}
                    onChange={this.inputHandler}
                    value={zipCode}
                    minLength='5'
                    maxLength='5' />
                  <div className='invalid-feedback'>
                    {!validZipCode && zipCode !== '' ? <small>Invalid zipcode - Must be 5 numbers</small> : null }
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
                    autoComplete='new-password'
                    name='creditCard'
                    className={`form-control ${validCreditCard ? '' : 'is-invalid'} border`}
                    minLength='16'
                    maxLength='16'
                    onChange={this.inputHandler}
                    value={creditCard} />
                  <div className='invalid-feedback'>
                    {!validCreditCard && creditCard !== '' ? <small>Invalid credit card number</small> : null}
                  </div>
                </div>
                <div className='form-group col-md-2'>
                  <label
                    htmlFor='inputState'
                    className='text-secondary'> Month
                  </label>
                  <select
                    className={`form-control ${validMonth ? '' : 'is-invalid'} border`}
                    name='month'
                    onChange={this.inputHandler}>
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
                    {!validMonth && month !== '' ? <small>Select a month </small> : null}
                  </div>
                </div>
                <div className='form-group col-md-2'>
                  <label
                    htmlFor='inputState'
                    className='text-secondary'> Year
                  </label>
                  <select
                    className={`form-control ${validYear ? '' : 'is-invalid'} border`}
                    name='year'
                    onChange={this.inputHandler}>
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
                    {!validYear && year !== '' ? <small>Select a year</small> : null}
                  </div>
                </div>
                <div className='form-group col-md-2'>
                  <label
                    htmlFor='inputZip'
                    className='text-secondary'> CVV
                  </label>
                  <input
                    type='tel'
                    autoComplete='new-password'
                    name='cvv'
                    className={`form-control ${validCvv ? '' : 'is-invalid'} border`}
                    onChange={this.inputHandler}
                    value={cvv}
                    minLength='3'
                    maxLength='4' />
                  <div className='invalid-feedback'>
                    {!validCvv && cvv !== '' ? <small>Invalid CVV - Must be at least 3 numbers</small> : null}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input className={`form-check-input ${agreementTerms ? '' : 'is-invalid'} border`}
                    name="agreementTerms"
                    type="checkbox"
                    id="gridCheck"
                    onChange={this.inputHandler} />
                  <label
                    className="form-check-label"
                    htmlFor="gridCheck">
                    I accept that this website is simply a demo site and not a real e-commerce store. <br/> I accept that no payment processing will be done, and that real personal information should not be used on submission of this form.
                  </label>
                </div>
              </div>
              <div
                className='d-flex justify-content-center align-items-center flex-column'
                style={{ padding: '0 25%' }}>

                {this.showButtonIfInfoValid()}

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
