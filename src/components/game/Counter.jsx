import React from 'react';
import { images } from '../../services';
import styles from '../../styles/game.module.css';
function Counter() {
  return <img src={images.counterRed} className={styles.counter} alt='' />;
}

export default Counter;
