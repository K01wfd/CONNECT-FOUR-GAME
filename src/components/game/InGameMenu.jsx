import React from 'react';
import logo from '../../assets/images/logo.svg';
function InGameMenu() {
  return (
    <header>
      <nav>
        <button className='btn-menu'>menu</button>
        <img src={logo} alt='logo' />
        <button className='btn-menu'>reset</button>
      </nav>
    </header>
  );
}

export default InGameMenu;
