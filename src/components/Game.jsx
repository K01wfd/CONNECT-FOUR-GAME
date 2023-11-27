import { useEffect, useState } from 'react';
import { boardShape, images, player, whichColumn } from '../services';
import { countDown, moveMarker, checkWinner } from '../utils';
import styles from '../styles/game.module.css';
import InGameMenu from './game/InGameMenu';
import Player1 from './game/Player1';
import Player2 from './game/Player2';
import Timer from './game/Timer';
import Marker from './game/Marker';
import Counter from './game/Counter';
import Winner from './game/Winner';
import TimeOut from './game/TimeOut';
function Game() {
  const [board, setBoard] = useState(boardShape);
  const [currentPlayer, setCurrentPlayer] = useState(player);
  let boardColumn = null;
  let winner = checkWinner(board);

  // handle counter drop
  const handleCounter = (e) => {
    if (!winner && currentPlayer.timeLeft !== 0) {
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
            setBoard(newBoard);
            break;
          }
        }

        console.log(winner);
        if (!winner) {
          setCurrentPlayer((prevPlayer) => {
            return {
              ...prevPlayer,
              activePlayer:
                prevPlayer.activePlayer === 'red' ? 'yellow' : 'red',
              timeLeft: 30,
            };
          });
        }
      }
    }
  };

  useEffect(() => {
    const timer = countDown(currentPlayer, setCurrentPlayer);
    if (winner) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [board, currentPlayer]);

  console.log(winner);
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
          onClick={(e) => handleCounter(e)}
          onMouseMove={(e) => moveMarker(e, currentPlayer.timeLeft, winner)}
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
        </div>
        {/* TIMER */}
        {!winner && currentPlayer.timeLeft !== 0 ? (
          <Timer currentPlayer={currentPlayer} />
        ) : null}
        {/* WINNER */}
        {winner && currentPlayer.timeLeft !== 0 ? (
          <Winner color={winner.color} />
        ) : null}
        {/* TIMEOUT */}
        {currentPlayer.timeLeft === 0 && !winner ? (
          <TimeOut currentPlayer={currentPlayer} />
        ) : null}
        {/* PLAYER 2 */}
        <Player2 />
      </main>
      <footer>
        <div className={`container bg-dark-purple`}></div>
      </footer>
    </>
  );
}

export default Game;
