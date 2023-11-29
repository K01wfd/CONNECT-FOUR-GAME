import styles from '../../styles/game/timer.module.css';
function Winner({ color, rematch, currentPlayer }) {
  const { activePlayer, timeLeft } = currentPlayer;
  const timeoutWinner =
    activePlayer === 'red' && timeLeft === 0 ? (
      <>
        <p className='uppercase '>Player 2</p>
        <p className='uppercase fs-h1'>Wins!</p>
      </>
    ) : (
      <>
        <p className='uppercase '>Player 1</p>
        <p className='uppercase fs-h1'>Wins!</p>
      </>
    );
  const patternWinner =
    color === 'red' ? (
      <>
        <p className='uppercase '>Player 1</p>
        <p className='uppercase fs-h1'>Wins!</p>
      </>
    ) : (
      <>
        <p className='uppercase '>Player 2</p>
        <p className='uppercase fs-h1'>Wins!</p>
      </>
    );
  return (
    <div className={`${styles.winner} bg-white`}>
      {timeLeft === 0 ? timeoutWinner : patternWinner}
      <button className='btn-menu' onClick={rematch}>
        Play Again
      </button>
    </div>
  );
}

export default Winner;
