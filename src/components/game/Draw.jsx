import styles from '../../styles/game/timer.module.css';

function Draw({ rematch }) {
  return (
    <div className={`${styles.winner} bg-white`}>
      <p className='uppercase'>No Winner</p>
      <p className='uppercase fs-h1'>draw</p>
      <button className='btn-menu' onClick={rematch}>
        Play Again
      </button>
    </div>
  );
}

export default Draw;
