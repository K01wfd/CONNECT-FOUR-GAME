import InGameMenu from './game/InGameMenu';
import styles from '../styles/game.module.css';
import blackLayerLarge from '../assets/images/board-layer-black-large.svg';
import blackLayerSmall from '../assets/images/board-layer-black-small.svg';
import whiteLayerLarge from '../assets/images/board-layer-white-large.svg';
import whiteLayerSmall from '../assets/images/board-layer-white-small.svg';
import Player1 from './game/Player1';
import Player2 from './game/Player2';
import Timer from './game/Timer';
import Marker from './game/Marker';
import { useEffect } from 'react';
function Game() {
  // moving marker
  useEffect(() => {
    let marker = document.getElementById('marker');
    const board = document.getElementById('gameBoard');
    board.addEventListener('mousemove', (e) => {
      let boardOffset = board.clientWidth * 0.08;
      if (
        e.offsetX > boardOffset &&
        e.offsetX < board.clientWidth - boardOffset
      ) {
        marker.style.left = e.offsetX - marker.clientWidth / 2 + 'px';
      }
    });
    board.addEventListener('touchstart', (e) => {
      if (
        e.offsetX > boardOffset &&
        e.offsetX < board.clientWidth - boardOffset
      ) {
        marker.style.left = e.offsetX - marker.clientWidth / 2 + 'px';
      }
    });
  }, []);

  return (
    <>
      <InGameMenu />
      <main className={`${styles.gameContainer} container grid`}>
        <Player1 />
        <div
          id='gameBoard'
          className={`${styles.gameBoard} grid`}
          aria-label='game borad'
        >
          <Marker />
          <div className={styles.upperLayer}>
            <picture>
              <source media='(max-width: 425px)' srcSet={whiteLayerSmall} />
              <source media='(min-width: 426px)' srcSet={whiteLayerLarge} />
              <img src={whiteLayerLarge} alt='' />
            </picture>
          </div>
          <div className={styles.lowerLayer}>
            <picture>
              <source media='(max-width: 425px)' srcSet={blackLayerSmall} />
              <source media='(min-width: 426px)' srcSet={blackLayerLarge} />
              <img src={blackLayerLarge} alt='' />
            </picture>
          </div>
        </div>
        <Player2 />
        <Timer />
      </main>
      <footer>
        <div className={`container bg-dark-purple`}></div>
      </footer>
    </>
  );
}

export default Game;
