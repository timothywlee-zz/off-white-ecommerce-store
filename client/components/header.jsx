import React from 'react';

function Header(props) {
  return (
    <div className='header text-light bg-dark col-12 w-100 m-0 '>
      <div className='col-12 pl-5'>${props.title}</div>
    </div>
  );
}

export default Header;
