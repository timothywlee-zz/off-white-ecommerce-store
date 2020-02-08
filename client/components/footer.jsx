import React from 'react';

function Footer(props) {

  return (
    <nav
      id='footerContainer'
      className='navbar bg-white p-0'
      style={{ height: '15vh' }}>
      <div
        id='footerInnerContainer'
        className='d-flex flex-row justify-content col-12'>
        <div className='col-2'></div>
        <div
          className='d-flex flex-column justify-content-center align-items-center col-8'>
          <div
            className='mailingListText'
            onClick={() => props.setView('mailing', {})}
            style={{ cursor: 'pointer', fontSize: '15px' }}>
            MAILING LIST
          </div>
          <img
            className='footerImg mt-1'
            src='/images/nikexoffwhite.png'
            style={{ objectFit: 'contain', height: '50px', width: '125px' }}/>
        </div>
        <div className='col-2'></div>
      </div>
    </nav>
  );
}

export default Footer;
