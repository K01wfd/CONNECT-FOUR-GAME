import React from 'react';
import { images } from '../../services';
import styles from '../../styles/game.module.css';
import { counterLargeCordinations } from '../../services';
function Counter({ col, row, color }) {
  let className = 'row' + row;
  return (
    <picture
      style={{
        left: counterLargeCordinations[col].left + '%',
        top: counterLargeCordinations[col].top[row] + '%',
      }}
      className={`${styles.counter} ${styles[className]}`}
    >
      <source
        media='(max-width: 425px)'
        srcSet={
          color === 'red' ? images.counterRedSmall : images.counterYellowSmall
        }
      />
      <source
        media='(min-width: 426px)'
        srcSet={color === 'red' ? images.counterRed : images.counterYellow}
      />
      <img
        src={color === 'red' ? images.counterRed : images.counterYellow}
        alt=''
      />
    </picture>
  );
}

export default Counter;
