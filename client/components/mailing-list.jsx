import React from 'react';

class MailingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ email: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ email: '' });
  }

  render() {
    return (
      <div
        id='mailingListContainer'
        style={{ height: '66vh' }}>
        <div
          id='innerMailingListContainer'
          className='d-flex flex-column col-12'>
          <div
            className='d-flex justify-content-center font-weight-bold'
            style={{ fontSize: '50px', marginBottom: '15vh' }}> MAILING LIST
          </div>
          <div
            className='d-flex flex-column'
            style={{ padding: '0 60vh' }}>
            <form
              className='d-flex flex-column justify-content-center'
              onSubmit={this.handleSubmit}>
              <div
                className='d-flex justify-content-center mb-3'
                style={{ fontSize: '30px' }}>Sign up for monthly updates
              </div>
              <label
                style={{ borderBottom: '2px solid black' }}>
                <div
                  className='d-flex flex-row justify-content-center mb-2'>
                  <input
                    type='text'
                    className='border-0'
                    placeholder='email address'
                    value={this.state.email}
                    onChange={this.handleChange}
                    style={{ width: '80%' }} />
                  <input
                    className='subscribe border-0'
                    type='submit'
                    value='subscribe' />
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

// test
