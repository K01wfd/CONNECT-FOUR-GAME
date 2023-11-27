import { useEffect, useState } from 'react';
import { boardShape, images, player, whichColumn } from '../services';
import {
  countDown,
  moveMarker,
  checkWinner,
  setTimeOutWinnerScore,
} from '../utils';
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
  const [score, setScore] = useState({ player1Score: 0, player2Score: 0 });
  let boardColumn = null;
  // check if there is pattern winner
  let patternWinner = checkWinner(board);
  // handle counter drop when column click
  const handleCounter = (e) => {
    if (!patternWinner && currentPlayer.timeLeft !== 0) {
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

        console.log(patternWinner);
        if (!patternWinner) {
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

  const rematch = () => {
    setBoard(boardShape);
    setCurrentPlayer(player);
    patternWinner = undefined;
  };
  useEffect(() => {
    // count down
    const timer = countDown(currentPlayer, setCurrentPlayer);
    // set winner score if timeout
    setTimeOutWinnerScore(currentPlayer, setScore);
    // if winner clear timeInterval and set score
    if (patternWinner) {
      clearInterval(timer);
      setScore((prevScore) => {
        if (patternWinner.color === 'red') {
          return { ...prevScore, player1Score: prevScore.player1Score + 1 };
        }
        if (patternWinner.color === 'yellow') {
          return { ...prevScore, player2Score: prevScore.player2Score + 1 };
        }
      });
    }
    return () => clearInterval(timer);
  }, [board, currentPlayer]);

  console.log(patternWinner);
  return (
    <>
      <InGameMenu />
      <main className={`${styles.gameContainer} container grid`}>
        {/* PLAYER 1 */}
        <Player1 score={score.player1Score} />
        {/* GAME BOARD CONTAINER */}
        <div
          id='gameBoard'
          className={`${styles.gameBoard} grid`}
          aria-label='game borad'
          onClick={(e) => handleCounter(e)}
          onMouseMove={(e) =>
            moveMarker(e, currentPlayer.timeLeft, patternWinner)
          }
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
        {!patternWinner && currentPlayer.timeLeft !== 0 ? (
          <Timer currentPlayer={currentPlayer} />
        ) : null}
        {/* WINNER */}
        {patternWinner && currentPlayer.timeLeft !== 0 ? (
          <Winner color={patternWinner.color} rematch={() => rematch()} />
        ) : null}
        {/* TIMEOUT */}
        {currentPlayer.timeLeft === 0 && !patternWinner ? (
          <TimeOut currentPlayer={currentPlayer} rematch={() => rematch()} />
        ) : null}
        {/* PLAYER 2 */}
        <Player2 score={score.player2Score} />
      </main>
      <footer>
        <div className={`container bg-dark-purple`}></div>
      </footer>
    </>
  );
}

export default Game;
