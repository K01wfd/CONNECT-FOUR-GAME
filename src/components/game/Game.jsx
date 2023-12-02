import { useEffect, useState } from 'react';
import {
  boardShape,
  images,
  player,
  scoreShape,
  columnCords,
} from '../../data';
import {
  countDown,
  moveMarker,
  checkWinner,
  setTimeOutWinnerScore,
  setFooterBg,
} from '../../utils';
import { predictHorizontalDraw } from '../../drawPrediction/horizontalDraw';
import styles from '../../styles/game/game.module.css';
import InGameMenu from './InGameMenu';
import Player1 from './Player1';
import Player2 from './Player2';
import Timer from './Timer';
import Marker from './Marker';
import Counter from './Counter';
import Winner from './Winner';
import { predictVerticalDraw } from '../../drawPrediction/verticalDraw';
import { generalDraw } from '../../drawPrediction/generalDraw';
import Draw from './Draw';
function Game({ onQuitGame }) {
  const [board, setBoard] = useState(boardShape);
  const [currentPlayer, setCurrentPlayer] = useState(player);
  const [score, setScore] = useState(scoreShape);
  let timer;
  let winningCounters = [];
  let boardColumn = null;
  let patternWinner = null;
  let draw = false;
  // 3. handle counter drop when column click
  const handleCounter = (e) => {
    if (!patternWinner && currentPlayer.timeLeft !== 0 && !draw) {
      let newBoard = [...board.map((inner) => [...inner])];
      let mouseLocation = (e.nativeEvent.offsetX / e.target.clientWidth) * 100;
      // get mouse location on which column
      for (let i = 0; i < columnCords.length; i++) {
        if (
          mouseLocation > columnCords[i].leftOffset &&
          mouseLocation < columnCords[i].rightOffset
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

  if (
    predictHorizontalDraw(board) &&
    predictVerticalDraw(board) &&
    !patternWinner
  ) {
    draw = true;
  }
  if (generalDraw(board) && !patternWinner) {
    draw = true;
  }
  // 4. check if there is pattern winner
  patternWinner = checkWinner(board);
  // 4.1 if winner get winning indexes
  if (patternWinner) {
    winningCounters = patternWinner.indexes;
  }
  // 5. rematch
  const rematch = () => {
    setBoard(boardShape);
    patternWinner = undefined;
    setCurrentPlayer((prevPlayer) => {
      return {
        ...prevPlayer,
        activePlayer: prevPlayer.activePlayer === 'red' ? 'yellow' : 'red',
        timeLeft: 30,
      };
    });
  };
  // 6. handle reset button
  const handleRestart = () => {
    setBoard(boardShape);
    setCurrentPlayer(player);
    setScore(scoreShape);
  };
  // 7. handle game pause
  const handlePause = () => {
    clearInterval(timer);
  };
  // 8. handle game resume
  const handleContinue = () => {
    if (!patternWinner) {
      timer = countDown(currentPlayer, setCurrentPlayer);
    }
  };
  //9. set footer bg
  let footerBg = setFooterBg(patternWinner, currentPlayer);

  useEffect(() => {
    // 1. count down
    timer = countDown(currentPlayer, setCurrentPlayer);
    // 2. set winner score if timeout
    setTimeOutWinnerScore(currentPlayer, setScore);
    // 4.2 if patternWinner clear timeInterval and set score
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
    if (draw) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [board, currentPlayer]);

  return (
    <>
      <InGameMenu
        onRestart={handleRestart}
        onQuitGame={onQuitGame}
        pauseGame={handlePause}
        continueGame={handleContinue}
      />
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
                    winningCounters={winningCounters}
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
        {!patternWinner && currentPlayer.timeLeft !== 0 && !draw ? (
          <Timer currentPlayer={currentPlayer} />
        ) : null}
        {/* WINNER */}
        {patternWinner || (currentPlayer.timeLeft === 0 && !draw) ? (
          <Winner
            color={patternWinner?.color}
            rematch={() => rematch()}
            currentPlayer={currentPlayer}
          />
        ) : null}
        {draw && <Draw rematch={rematch} />}
        {/* PLAYER 2 */}
        <Player2 score={score.player2Score} />
      </main>
      <footer>
        <div className={`${footerBg}`}></div>
      </footer>
    </>
  );
}

export default Game;
