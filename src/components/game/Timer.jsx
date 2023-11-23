import styles from '../../styles/game/timer.module.css';

function Timer({ timer, activePlayer }) {
  return (
    <div
      className={`${styles.timerContainer} ${
        activePlayer === 'red' ? styles.player1Turn : styles.player2Turn
      }`}
    >
      <p>PLAYER 2&apos;S TURN</p>
      <p className='fs-h1'>{timer}s</p>
    </div>
  );
}

export default Timer;
