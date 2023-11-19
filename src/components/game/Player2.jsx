import playerTwoImage from '../../assets/images/player-two.svg';
import styles from '../../styles/game/player.module.css';

function Player2() {
  return (
    <div className={`${styles.player2} bg-white flex`}>
      <img src={playerTwoImage} alt='' />
      <div>
        <p className='fs-h3'>Player 2</p>
        <p className='fs-h1-2'>0</p>
      </div>
    </div>
  );
}

export default Player2;
