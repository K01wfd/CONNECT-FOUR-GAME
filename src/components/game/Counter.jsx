import React from 'react';
import { images } from '../../services';
import styles from '../../styles/game/counter.module.css';
import { counterLargeCordinations } from '../../services';
function Counter({ col, row, color, winningCounters }) {
  let className = 'row' + row;
  let winnerCounterFound = false;
  if (winningCounters) {
    winningCounters.map((obj) => {
      if (obj.col === col && obj.row === row) {
        winnerCounterFound = true;
      }
    });
  }
  return (
    <picture
      style={{
        left: counterLargeCordinations[col].left + '%',
        top: counterLargeCordinations[col].top[row] + '%',
      }}
      className={`${styles.counter} ${styles[className]}`}
    >
      <span className={winnerCounterFound ? styles.circle : ''}></span>
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
