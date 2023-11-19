import styles from '../../styles/game/timer.module.css';

function Timer() {
  return (
    <div className={`${styles.timerContainer} ${styles.player2Turn}`}>
      <p>PLAYER 2&apos;S TURN</p>
      <p className='fs-h1'>timer</p>
    </div>
  );
}

export default Timer;
