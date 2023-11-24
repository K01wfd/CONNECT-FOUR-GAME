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
  const [currentPlayer, setCurrentPlayer] = useState('red');
  let colIndex = null;

  const handleCouterDrop = (e) => {
    let newBoard = [...board.map((inner) => [...inner])];
    let mouseLocation = (e.nativeEvent.offsetX / e.target.clientWidth) * 100;

    // get mouse location on which column
    for (let i = 0; i < whichColumn.length; i++) {
      if (
        mouseLocation > whichColumn[i].leftOffset &&
        mouseLocation < whichColumn[i].rightOffset
      ) {
        colIndex = i;
        break;
      } else {
        colIndex = null;
      }
    }
    // update column index
    if (colIndex !== null) {
      const targetColumn = newBoard[colIndex];
      for (let i = targetColumn.length - 1; i >= 0; i--) {
        if (targetColumn[i] === null) {
          newBoard[colIndex][i] = currentPlayer;
          break;
        }
      }
      setBoard(newBoard);
      setCurrentPlayer((prevPlayer) => {
        return prevPlayer === 'red' ? 'yellow' : 'red';
      });
    }
  };

  useEffect(() => {
    moveMarker('marker', 'gameBoard');
    console.log(board);
  }, [board]);

  return (
    <>
      <InGameMenu />
      <main className={`${styles.gameContainer} container grid`}>
        <Player1 />
        <div
          id='gameBoard'
          className={`${styles.gameBoard} grid`}
          aria-label='game borad'
          onClick={(e) => handleCouterDrop(e)}
        >
          <Marker />
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
  let boardOffset;
  board.addEventListener('mousemove', (e) => {
    boardOffset = board.clientWidth * 0.078;
    if (
      e.offsetX > boardOffset &&
      e.offsetX < board.clientWidth - boardOffset
    ) {
      marker.style.left = e.offsetX - marker.clientWidth / 2.2 + 'px';
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
