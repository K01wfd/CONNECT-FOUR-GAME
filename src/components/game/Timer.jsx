import styles from '../../styles/game/timer.module.css';

function Timer({ currentPlayer }) {
  const { activePlayer, timeLeft } = currentPlayer;
  return (
    <div
      className={`${styles.timerContainer} ${
        activePlayer === 'red' ? styles.player1Turn : styles.player2Turn
      } ${activePlayer === 'red' && 'text-white'}`}
    >
      <p>{activePlayer === 'red' ? "PLAYER'1S TURN" : "PLAYER'2S TURN"}</p>
      <p className='fs-h1'>
        {timeLeft}
        <span className='fs-h4'>s</span>
      </p>
    </div>
  );
}

export default Timer;
