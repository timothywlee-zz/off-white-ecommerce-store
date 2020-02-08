import React from 'react';

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
      }
    };
    this.inputHandler = this.inputHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.taxCalculation = this.taxCalculation.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  inputHandler(event) {
    const validation = {
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
    };

    const validateNumbers = RegExp(/^[0-9]*$/);
    const target = event.target.name;

    if (target === 'phone' || target === 'creditCard' || target === 'zipCode' || target === 'cvv') {
      if (validateNumbers.test(event.target.value)) {
        this.setState({ [target]: event.target.value });
      }
    } else if (target === 'fullName' || target === 'address' || target === 'city') {
      if (event.target.value.indexOf('  ') === -1) {
        this.setState({ [target]: event.target.value });
      }
    } else if (target === 'agreementTerms') {
      this.setState({ agreementTerms: !this.state.agreementTerms });
    } else {
      this.setState({ [target]: event.target.value });
    }

    this.setState({ validation });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { fullName, phone, email, address, city, state, zipCode, creditCard, month, year, cvv, agreementTerms } = this.state;
    const validateName = RegExp(/^[a-zA-Z ,'-]{5,65}$/);
    const validateEmail = RegExp(/^([a-zA-Z\d.-_]{1,64})@([a-z\d-]{1,227})\.([a-z]{2,28})$/);
    const validation = JSON.parse(JSON.stringify(this.state.validation));

    if (fullName.length < 5 || !validateName.test(fullName)) {
      validation.fullName = false;
    }
    if (phone.length < 10) {
      validation.phone = false;
    }
    if (!validateEmail.test(email)) {
      validation.email = false;
    }
    if (address.length < 6) {
      validation.address = false;
    }
    if (city.length < 3) {
      validation.city = false;
    }
    if (state.length < 2) {
      validation.state = false;
    }
    if (zipCode.length < 5) {
      validation.zipCode = false;
    }
    if (creditCard.length < 16) {
      validation.creditCard = false;
    }
    if (month.length < 2) {
      validation.month = false;
    }
    if (year.length < 2) {
      validation.year = false;
    }
    if (cvv.length < 3) {
      validation.cvv = false;
    }
    if (!agreementTerms) {
      validation.agreementTerms = false;
    }

    if (Object.values(validation).indexOf(false) === -1) {
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

    } else {
      this.setState({
        fullName: fullName.trim(),
        address: address.trim(),
        city: city.trim(),
        validation: validation
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

  render() {
    const { fullName, phone, address, city, zipCode, creditCard, cvv, validation } = this.state;
    const left = { width: '50%', textAlign: 'left' };
    const right = { width: '50%', textAlign: 'right' };

    return (
      <div className='container checkoutContainer'>
        <div className='row'>
          <div className='col-sm-8'>
            <form className='p-3'
              onChange={this.inputHandler}
              onSubmit={this.handleSubmit}
              noValidate>
              <div className='form-group'>
                <h4> Shipping Address</h4>
              </div>
              <div className='form-group'>
                <label htmlFor='name' className='text-secondary'>Full Name</label>
                <input type='text'
                  autoComplete='new-password'
                  name='fullName'
                  className={`form-control ${validation.fullName ? '' : 'is-invalid'}`}
                  onChange={this.inputHandler}
                  value={fullName}
                  minLength='5'
                  maxLength='65' />
                <div className='invalid-feedback'>
                  {fullName.length < 5 && fullName !== '' ? <div>Minimum of five characters</div> : <div>Invalid name input</div>}
                </div>
              </div>
              <div className='form-row'>
                <div className='form-group col-md-6'>
                  <label htmlFor="email" className='text-secondary'>Email</label>
                  <input type="email"
                    autoComplete="new-password"
                    name='email'
                    className={`form-control ${validation.email ? '' : 'is-invalid'}`}
                    minLength="6"
                    maxLength="254" />
                  <div className='invalid-feedback'>
                    <div>Invalid email address</div>
                  </div>
                </div>
                <div className='form-group col-md-6'>
                  <label htmlFor='name' className='text-secondary'>Phone</label>
                  <input type='tel'
                    autoComplete='new-password'
                    name='phone'
                    className={`form-control ${validation.phone ? '' : 'is-invalid'}`}
                    onChange={this.inputHandler}
                    value={phone}
                    minLength='10'
                    maxLength='11' />
                  <div className='invalid-feedback'>
                    <div>Invalid phone number</div>
                  </div>
                </div>
              </div>
              <div className='form-row'>
                <div className='form-group col-md-12'>
                  <label htmlFor='inputAddress' className='text-secondary'>Address </label>
                  <input type='text'
                    autoComplete='new-password'
                    name='address'
                    onChange={this.inputHandler}
                    value={address}
                    minLength='6'
                    maxLength='42'
                    className={`form-control ${validation.address ? '' : 'is-invalid'}`} />
                  <div className='invalid-feedback'>
                    {address.length < 6 && address !== '' ? <div>Minimum of six characters</div> : <div>Invalid street address</div>}
                  </div>
                </div>
              </div>
              <div className='form-row'>
                <div className='form-group col-md-6'>
                  <label htmlFor='inputCity' className='text-secondary'>City</label>
                  <input type='text'
                    autoComplete='new-password'
                    name='city'
                    className={`form-control ${validation.city ? '' : 'is-invalid'}`}
                    onChange={this.inputHandler}
                    value={city}
                    minLength='3'
                    maxLength='50' />
                  <div className='invalid-feedback'>
                    {city.length < 3 && city !== '' ? <div>Minimum of three characters</div> : <div>Invalid city</div>}
                  </div>
                </div>
                <div className='form-group col-md-3'>
                  <label htmlFor='inputState' className='text-secondary'>State</label>
                  <select className={`form-control ${validation.state ? '' : 'is-invalid'}`}
                    name='state'>
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
                    <div>Select a state</div>
                  </div>
                </div>
                <div className='form-group col-md-3'>
                  <label htmlFor='inputZip' className='text-secondary'>Zip</label>
                  <input type='tel'
                    autoComplete='new-password'
                    name='zipCode'
                    className={`form-control ${validation.zipCode ? '' : 'is-invalid'}`}
                    onChange={this.inputHandler}
                    value={zipCode}
                    minLength='5'
                    maxLength='5' />
                  <div className='invalid-feedback'>
                    <div>Invalid zipcode</div>
                  </div>
                </div>
              </div>
              <div className='form-group mt-2'>
                <h4>Payment Details</h4>
              </div>
              <div className='form-row mb-3'>
                <div className='form-group col-md-6'>
                  <label htmlFor='creditCard' className='text-secondary'>Credit Card Number</label>
                  <input type='tel'
                    autoComplete='new-password'
                    name='creditCard'
                    className={`form-control ${validation.creditCard ? '' : 'is-invalid'}`}
                    minLength='16'
                    maxLength='16'
                    onChange={this.inputHandler}
                    value={creditCard} />
                  <div className='invalid-feedback'>
                    <div>Invalid credit card number</div>
                  </div>
                </div>
                <div className='form-group col-md-2'>
                  <label htmlFor='inputState' className='text-secondary'>Month</label>
                  <select className={`form-control ${validation.month ? '' : 'is-invalid'}`}
                    name='month'>
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
                    <div>Select a month </div>
                  </div>
                </div>
                <div className='form-group col-md-2'>
                  <label htmlFor='inputState' className='text-secondary'>Year</label>
                  <select className={`form-control ${validation.year ? '' : 'is-invalid'}`}
                    name='year'>
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
                    <div>Select a year</div>
                  </div>
                </div>
                <div className='form-group col-md-2'>
                  <label htmlFor='inputZip' className='text-secondary'>CVV</label>
                  <input type='tel'
                    autoComplete='new-password'
                    name='cvv'
                    className={`form-control ${validation.cvv ? '' : 'is-invalid'}`}
                    onChange={this.inputHandler}
                    value={cvv}
                    minLength='3'
                    maxLength='4' />
                  <div className='invalid-feedback'>
                    <div>Invalid CVV</div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input className={`form-check-input ${validation.agreementTerms ? '' : 'is-invalid'}`}
                    name="agreementTerms"
                    type="checkbox"
                    id="gridCheck" />
                  <label className="form-check-label"
                    htmlFor="gridCheck">
                    I accept that this website is simply a demo site and not a real e-commerce store. <br/> I accept that no payment processing will be done, and that real personal information should not be used on submission of this form.
                  </label>
                  <div className="invalid-feedback">
                    <div>Terms are required</div>
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-center align-items-center flex-column' style={{ padding: '0 20%' }}>
                <button
                  className='d-flex btn btn-outline-primary justify-content-center mb-1'
                  onClick={this.handleSubmit}
                  style={{ cursor: 'pointer', width: '100%' }}>
                  Process Order
                </button>
                <button
                  className='d-flex btn btn-outline-dark justify-content-center'
                  onClick={() => this.props.setView('cart', {})}
                  style={{ cursor: 'pointer', width: '100%' }}>
                  Back To Cart
                </button>
              </div>
            </form>
          </div>
          <div className='col-sm-4'>
            <h2 style={{ borderBottom: '1px solid #D3D3D3', textAlign: 'left', marginBottom: '0' }}> Summary </h2>
            <div className='d-flex flex-column py-3' style={{ borderBottom: '1px solid #D3D3D3' }}>
              <div className='d-flex flex-row ' >
                <div className='' style={left}> Subtotal </div>
                <div className='' style={right}> ${this.props.itemTotal} </div>
              </div>
              <div className='d-flex flex-row'>
                <div className='' style={left}> Shipping </div>
                <div className='' style={right}> FREE </div>
              </div>
              <div className='d-flex flex-row'>
                <div className='' style={left}> Tax </div>
                <div className='' style={right}> ${this.taxCalculation()} </div>
              </div>
            </div>
            <div className='d-flex flex-row mt-3'>
              <h4 className='' style={left}> TOTAL </h4>
              <h4 className='' style={right}> ${this.calculateTotal()} </h4>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center mt-3'>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
