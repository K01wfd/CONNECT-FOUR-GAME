import styles from '../../styles/game/timer.module.css';
function Winner({ color }) {
  console.log(color);
  return (
    <div className={`${styles.winner} bg-white`}>
      {color === 'red' && (
        <>
          <p className='uppercase '>Player 1</p>
          <p className='uppercase fs-h1'>Wins!</p>
        </>
      )}
      {color === 'yellow' && (
        <>
          <p className='uppercase '>Player 2</p>
          <p className='uppercase fs-h1'>Wins!</p>
        </>
      )}
      <button className='btn-menu'>Play Again</button>
    </div>
  );
}

export default Winner;
