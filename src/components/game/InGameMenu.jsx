import React from 'react';
import logo from '../../assets/images/logo.svg';
import styles from '../../styles/game/inGameMenu.module.css';

function InGameMenu() {
  return (
    <header className={`${styles.menuHeader} container-game`}>
      <nav className='flex'>
        <button className='btn-menu'>menu</button>
        <img src={logo} alt='logo' />
        <button className='btn-menu'>restart</button>
      </nav>
    </header>
  );
}

export default InGameMenu;
