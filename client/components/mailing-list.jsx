import React from 'react';

class MailingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      validEmail: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.addEmail = this.addEmail.bind(this);
  }

  handleChange(event) {
    this.setState({ email: event.target.value });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.email !== prevState.email) {
      this.validateEmail();
    }
  }

  validateEmail() {
    const { email } = this.state;
    const validateEmail = RegExp(/^([a-zA-Z\d\-_]{1,64})@([a-z\d-]{1,227})\.([a-z]{2,28})$/);

    if (!validateEmail.test(email)) {
      this.setState({ validEmail: false });
    } else {
      this.setState({ validEmail: true });
    }
  }

  addEmail(event) {
    event.preventDefault();
    const { email } = this.state;
    fetch('/api/emailSub', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(() => this.setState({ email: '' }))
      .catch(err => console.error(err));
  }

  render() {
    const { email, validEmail } = this.state;
    return (
      <div
        id='mailingListContainer'
        style={{ height: '72vh' }}>
        <div
          id='innerMailingListContainer'
          className='d-flex flex-column col-12'>
          <div
            className='d-flex justify-content-center font-weight-bold'
            style={{ fontSize: '5vh', marginBottom: '15vh' }}> MAILING LIST
          </div>
          <div
            className='d-flex flex-column align-items-center'
            style={{ width: '100%' }}>
            <form
              className='d-flex flex-column justify-content-center'
              onSubmit={this.addEmail}
              style={{ width: '60%' }}>
              <div
                className='d-flex justify-content-center mb-3'
                style={{ fontSize: '20px', textAlign: 'center' }}>Sign up for monthly updates
              </div>
              <label
                style={{ borderBottom: '2px solid black' }}>
                <div
                  className='d-flex flex-column justify-content-center mb-2'>

                  <div className='d-flex flex-row justify-content-center'>
                    <input
                      type='text'
                      className='border-0'
                      placeholder='email address'
                      value={this.state.email}
                      onChange={this.handleChange}
                      style={{ width: '80%', fontSize: '15px' }} />

                    {!validEmail
                      ? <div
                        className='border-0'
                        style={{ fontSize: '15px' }} > subscribe </div>
                      : <button
                        className='subscribe border-0'
                        type='submit'
                        style={{ fontSize: '15px', backgroundColor: 'white' }}> subscribe </button>}
                  </div>
                  {!validEmail && email !== '' ? <div style={{ fontSize: '13px', textAlign: 'center', color: '#ff8c00' }}> `Email must be a valid address (e.g. me@mydomain.com` </div> : null }
                </div>
              </label>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default MailingList;
