import styles from '../styles/gameRules.module.css';
function GameRues({ onRulesClose }) {
  return (
    <article className={`${styles.gameRules} flow`} aria-label='game rules'>
      <h1 className='fs-h1'>Rules</h1>
      <div className='flow-medium'>
        <div className='flow-small'>
          <h2 className='fs-h3 text-purple'>OBJECTIVE</h2>
          <p className='opacity-66'>
            Be the first player to connect 4 of the same colored discs in a row
            (either vertically, horizontally, or diagonally).
          </p>
        </div>
        {/*  */}
        <div className='flow-small'>
          <h2 className='fs-h3 text-purple'>HOW TO PLAY</h2>
          <ol className={`${styles.rulesList} flow-small`}>
            <li className='flex'>
              <span className='mr-s'>1</span>
              <span className='opacity-66'>
                Red goes first in the first game.
              </span>
            </li>
            <li className='flex'>
              <span className='mr-s'>2</span>
              <span className='opacity-66'>
                Players must alternate turns, and only one disc can be dropped
                in each turn.
              </span>
            </li>
            <li className='flex'>
              <span className='mr-s'>3</span>
              <span className='opacity-66'>
                The game ends when there is a 4-in-a-row or a stalemate.
              </span>
            </li>
            <li className='flex'>
              <span className='mr-s'>3</span>
              <span className='opacity-66'>
                The starter of the previous game goes second on the next game.
              </span>
            </li>
          </ol>
        </div>
      </div>
      <button
        className={`${styles.closeRules} btn-check`}
        aria-label='close game rules'
        onClick={onRulesClose}
      ></button>
    </article>
  );
}

export default GameRues;
