import playerOneImage from '../../assets/images/player-one.svg';
import styles from '../../styles/game/player.module.css';
function Player1({ score }) {
  return (
    <div className={`${styles.player1} bg-white flex`}>
      <img src={playerOneImage} alt='' />
      <div>
        <p className='fs-h3'>Player 1</p>
        <p className='fs-h1-2'>{score}</p>
      </div>
    </div>
  );
}

export default Player1;
