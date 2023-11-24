import styles from '../../styles/game/timer.module.css';

function Timer({ currentPlayer }) {
  const { activePlayer, timeLeft } = currentPlayer;

  const winningState = () => {
    const winner = (
      <div className={`${styles.winner} bg-white`}>
        {activePlayer === 'red' && timeLeft === 0 ? (
          <>
            <p className='uppercase '>Player 2</p>
            <p className='uppercase fs-h1'>Wins!</p>
          </>
        ) : (
          <>
            <p className='uppercase '>Player 1</p>
            <p className='uppercase fs-h1'>Wins!</p>
          </>
        )}
        <button className='btn-menu'>Play Again</button>
      </div>
    );
    return winner;
  };
  return (
    <>
      {timeLeft === 0 ? (
        winningState()
      ) : (
        <div
          className={`${styles.timerContainer} ${
            activePlayer === 'red' ? styles.player1Turn : styles.player2Turn
          } ${activePlayer === 'red' && 'text-white'}`}
        >
          <p>{activePlayer === 'red' ? "PLAYER'1S TURN" : "PLAYER'2S TURN"}</p>
          <p className='fs-h1'>{timeLeft}</p>
        </div>
      )}
    </>
  );
}

export default Timer;
