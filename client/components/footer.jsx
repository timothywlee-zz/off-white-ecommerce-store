import React from 'react';

function Footer(props) {

  return (
    <nav
      id='footerContainer'
      className='navbar bg-white p-0'
      style={{ height: '130px' }}>
      <div
        id='footerInnerContainer'
        className='d-flex flex-row justify-content col-12'
        style={{ height: '100%' }}>
        <div className='col-2'></div>
        <div
          className='d-flex flex-column justify-content-center align-items-center col-8'>
          <div
            className='mailingListText'
            onClick={() => props.setView('mailing', {})}
            style={{ cursor: 'pointer', fontSize: '13px' }}> MAILING LIST
          </div>
          <img
            className='footerImg mt-1'
            src='/images/nikexoffwhite.png'
            style={{ objectFit: 'contain', height: '50px', width: '120px' }}
          />
        </div>
        <div className='col-2'></div>
      </div>
    </nav>
  );
}

export default Footer;
