import InGameMenu from './game/InGameMenu';
import styles from '../styles/game.module.css';
import blackLayerLarge from '../assets/images/board-layer-black-large.svg';
import blackLayerSmall from '../assets/images/board-layer-black-small.svg';
import whiteLayerLarge from '../assets/images/board-layer-white-large.svg';
import whiteLayerSmall from '../assets/images/board-layer-white-small.svg';
function Game() {
  return (
    <>
      <InGameMenu />
      <main className={`${styles.gameContainer} container grid`}>
        <div className={`${styles.gameBoard} grid`} aria-label='game borad'>
          <div className={styles.fakeLayout} aria-hidden='true'></div>
          <picture>
            <source media='(max-width: 425px)' srcSet={whiteLayerSmall} />
            <source media='(min-width: 426px)' srcSet={whiteLayerLarge} />
            <img src={whiteLayerLarge} alt='' />
          </picture>
          <div className={styles.lowerLayer}>
            <picture>
              <source media='(max-width: 425px)' srcSet={blackLayerSmall} />
              <source media='(min-width: 426px)' srcSet={blackLayerLarge} />
              <img src={blackLayerLarge} alt='' />
            </picture>
          </div>
        </div>
      </main>
    </>
  );
}

export default Game;
