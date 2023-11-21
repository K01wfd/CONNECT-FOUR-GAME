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
import { useEffect, useState } from 'react';
function Game() {
  const [turnTime, setTurnTime] = useState(30);
  // moving marker
  useEffect(() => {
    moveMarker('marker', 'gameBoard');
    const timer = setInterval(() => {
      if (turnTime > 0) {
        setTurnTime((prevTime) => prevTime - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [turnTime]);

  return (
    <>
      <InGameMenu />
      <main className={`${styles.gameContainer} container grid`}>
        <Player1 />
        <h1 className='fs-h1'>{turnTime}</h1>
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
          <Timer timer={turnTime} />
        </div>

        <Player2 />
      </main>
      <footer>
        <div className={`container bg-dark-purple`}></div>
      </footer>
    </>
  );
}

const moveMarker = (markerId, boardId) => {
  let marker = document.getElementById(markerId);
  const board = document.getElementById(boardId);
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
};
export default Game;
