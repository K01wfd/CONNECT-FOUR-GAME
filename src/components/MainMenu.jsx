import React from 'react';
import logo from '../assets/images/logo.svg';
import playerVsPlayer from '../assets/images/player-vs-player.svg';
import styles from '../styles/mainMenu.module.css';
function MainMenu({ onGameRules, onPlayStart }) {
  return (
    <header className={`${styles.mainMenu} flex`}>
      <img src={logo} alt='logo' />
      <nav className={`${styles.mainNav} flow`}>
        <button className='btn btn--yellow btn-icons' onClick={onPlayStart}>
          PLAY VS PLAYER
          <span aria-hidden='true'>
            <img className='icon' src={playerVsPlayer} alt='' />
          </span>
        </button>
        <button className='btn btn--white' onClick={onGameRules}>
          GAME RULES
        </button>
      </nav>
    </header>
  );
}

export default MainMenu;
