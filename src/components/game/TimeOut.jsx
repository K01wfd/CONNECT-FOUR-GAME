import styles from '../../styles/game/timer.module.css';

function TimeOut({ currentPlayer, rematch }) {
  const { activePlayer, timeLeft } = currentPlayer;
  return (
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
      <button className='btn-menu' onClick={rematch}>
        Play Again
      </button>
    </div>
  );
}

export default TimeOut;
