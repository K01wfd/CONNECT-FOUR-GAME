import { useState } from 'react';
import MainMenu from './components/MainMenu';
import GameRues from './components/GameRues';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  let gameOptions = { playing: false, rules: false };
  return (
    <>
      {!gameStarted && <MainMenu />}
      {gameOptions.rules && <GameRues />}
    </>
  );
}

export default App;
