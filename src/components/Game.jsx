import { useEffect, useRef, useState } from 'react';
import { boardShape, images, whichColumn } from '../services';
import styles from '../styles/game.module.css';
import InGameMenu from './game/InGameMenu';
import Player1 from './game/Player1';
import Player2 from './game/Player2';
import Timer from './game/Timer';
import Marker from './game/Marker';
import Counter from './game/Counter';
function Game() {
  const [board, setBoard] = useState(boardShape);
  const [currentPlayer, setCurrentPlayer] = useState({
    activePlayer: 'red',
    timeLeft: 5,
  });
  let boardColumn = null;
  let winner = false;

  // handle counter drop
  const handleCouterDrop = (e) => {
    if (!winner) {
      let newBoard = [...board.map((inner) => [...inner])];
      let mouseLocation = (e.nativeEvent.offsetX / e.target.clientWidth) * 100;
      // get mouse location on which column
      for (let i = 0; i < whichColumn.length; i++) {
        if (
          mouseLocation > whichColumn[i].leftOffset &&
          mouseLocation < whichColumn[i].rightOffset
        ) {
          boardColumn = i;
          break;
        } else {
          boardColumn = null;
        }
      }
      // update column index
      if (boardColumn !== null) {
        const targetColumn = newBoard[boardColumn];
        for (let i = targetColumn.length - 1; i >= 0; i--) {
          if (targetColumn[i] === null) {
            newBoard[boardColumn][i] = currentPlayer.activePlayer;
            break;
          }
        }
        setBoard(newBoard);
        setCurrentPlayer((prevPlayer) => {
          return {
            ...prevPlayer,
            activePlayer: prevPlayer.activePlayer === 'red' ? 'yellow' : 'red',
            timeLeft: 30,
          };
        });
      }
    }
  };

  // watch time
  const watchTimeLeft = () => {
    const timer = setInterval(() => {
      if (currentPlayer.timeLeft > 0) {
        setCurrentPlayer((prevPlayer) => {
          return { ...prevPlayer, timeLeft: prevPlayer.timeLeft - 1 };
        });
      } else {
        winner = true;
      }
    }, 1000);
    return timer;
  };
  useEffect(() => {
    const timer = watchTimeLeft();
    return () => clearInterval(timer);
  }, [board, currentPlayer]);

  return (
    <>
      <InGameMenu />
      <main className={`${styles.gameContainer} container grid`}>
        {/* PLAYER 1 */}
        <Player1 />
        {/* GAME BOARD CONTAINER */}
        <div
          id='gameBoard'
          className={`${styles.gameBoard} grid`}
          aria-label='game borad'
          onClick={(e) => handleCouterDrop(e)}
          onMouseMove={(e) => moveMarker(e, 'marker', currentPlayer.timeLeft)}
        >
          {/* MARKER */}
          <Marker />
          {/* COUNTERS */}
          {board.map((col, colIndex) =>
            col.map(
              (cel, rowIndex) =>
                cel !== null && (
                  <Counter
                    key={colIndex + rowIndex}
                    col={colIndex}
                    row={rowIndex}
                    color={cel}
                  />
                )
            )
          )}
          {/* BOARD LAYER */}
          <div className={styles.upperLayer}>
            <picture>
              <source
                media='(max-width: 425px)'
                srcSet={images.whiteLayerSmall}
              />
              <source
                media='(min-width: 426px)'
                srcSet={images.whiteLayerLarge}
              />
              <img src={images.whiteLayerLarge} alt='' />
            </picture>
          </div>
          <div className={styles.lowerLayer}>
            <picture>
              <source
                media='(max-width: 425px)'
                srcSet={images.blackLayerSmall}
              />
              <source
                media='(min-width: 426px)'
                srcSet={images.blackLayerLarge}
              />
              <img src={images.blackLayerLarge} alt='' />
            </picture>
          </div>
          {/* TIMER */}
          <Timer currentPlayer={currentPlayer} />
        </div>
        {/* PLAYER 2 */}
        <Player2 />
      </main>
      <footer>
        <div className={`container bg-dark-purple`}></div>
      </footer>
    </>
  );
}

const moveMarker = (e, markerId, timeLeft) => {
  if (timeLeft !== 0) {
    let marker = document.getElementById(markerId);

    let boardOffset;

    boardOffset = e.target.clientWidth * 0.078;
    if (
      e.nativeEvent.offsetX > boardOffset &&
      e.nativeEvent.offsetX < e.target.clientWidth - boardOffset
    ) {
      marker.style.left =
        e.nativeEvent.offsetX - marker.clientWidth / 2.2 + 'px';
    }
  }
};

export default Game;
