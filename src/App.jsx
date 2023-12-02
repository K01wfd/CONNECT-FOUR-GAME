import { useState } from 'react';
import MainMenu from './components/MainMenu';
import GameRules from './components/GameRules';
import Game from './components/game/Game';
const INITIAL_GAME = {
  started: false,
  twoPlayerMode: false,
  cpuMode: false,
  rules: false,
};
function App() {
  const [game, setGame] = useState(INITIAL_GAME);

  const handleTowPlayerMode = () => {
    setGame((prev) => {
      return { ...prev, started: true, twoPlayerMode: true };
    });
  };
  const toggleRules = () => {
    setGame((prev) => {
      return { ...prev, started: !prev.started, rules: !prev.rules };
    });
  };
  const handleGameQuit = () => {
    setGame(INITIAL_GAME);
  };
  return (
    <>
      {!game.started && (
        <MainMenu
          onGameRules={toggleRules}
          onTwoPlayerMode={handleTowPlayerMode}
        />
      )}
      {game.rules && <GameRules onRulesClose={toggleRules} />}
      {game.twoPlayerMode && game.started ? (
        <Game onQuitGame={handleGameQuit} />
      ) : null}
    </>
  );
}

export default App;
