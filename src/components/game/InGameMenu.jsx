import React, { useState } from 'react';
import logo from '../../assets/images/logo.svg';
import styles from '../../styles/game/inGameMenu.module.css';

function InGameMenu({ onRestart }) {
  const [popup, setPopup] = useState({
    confirmPopup: false,
    inGameMenuPopup: false,
  });

  const onConfirm = () => {
    setPopup((prev) => {
      return { ...prev, confirmPopup: true };
    });
  };
  const cancelRestart = () => {
    setPopup((prev) => {
      return { ...prev, confirmPopup: false };
    });
  };
  const restart = () => {
    setPopup((prev) => {
      return { ...prev, confirmPopup: false };
    });
  };
  return (
    <>
      <header className={`${styles.menuHeader} container-game`}>
        <nav className='flex'>
          <button className='btn-menu'>menu</button>
          <img src={logo} alt='logo' />
          <button className='btn-menu' onClick={onConfirm}>
            restart
          </button>
        </nav>
      </header>
      {popup.confirmPopup && (
        <aside className={styles.confirmation}>
          <div className={`${styles.confirmationContent} bg-white`}>
            <h2>Would you like to restart the game ?</h2>
            <div className={styles.confirmationBtns}>
              <button className='btn btn--white' onClick={cancelRestart}>
                No
              </button>
              <button
                className='btn btn--red'
                onClick={() => {
                  onRestart();
                  restart();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

export default InGameMenu;
