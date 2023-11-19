import { useState } from 'react';
import MainMenu from './components/MainMenu';
import GameRules from './components/GameRules';
import Game from './components/Game';

function App() {
  const [game, setGame] = useState({
    started: false,
    twoPlayerMode: false,
    cpuMode: false,
    rules: false,
  });

  const switchGameState = () => {
    setGame((prev) => {
      return { ...prev, started: true, twoPlayerMode: true };
    });
  };
  const toggleRules = () => {
    setGame((prev) => {
      return { ...prev, started: !prev.started, rules: !prev.rules };
    });
  };
  return (
    <>
      {!game.started && (
        <MainMenu onGameRules={toggleRules} onTwoPlayerMode={switchGameState} />
      )}
      {game.rules && <GameRules onRulesClose={toggleRules} />}
      {game.twoPlayerMode && <Game />}
    </>
  );
}

export default App;
