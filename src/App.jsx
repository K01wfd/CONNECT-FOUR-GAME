import { useState } from 'react';
import MainMenu from './components/MainMenu';
import GameRues from './components/GameRules';

function App() {
  const [game, setGame] = useState({
    started: false,
    twoPlayerMode: false,
    cpuMode: false,
    rules: false,
  });

  const switchGameState = () => {};
  const toggleRules = () => {
    setGame((prev) => {
      return { ...prev, rules: !prev.rules };
    });
  };
  return (
    <>
      {!game.started && (
        <MainMenu onGameRules={toggleRules} onPlayStart={switchGameState} />
      )}
      {game.rules && <GameRues onRulesClose={toggleRules} />}
    </>
  );
}

export default App;
