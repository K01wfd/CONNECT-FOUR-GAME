import { useState } from 'react';
import MainMenu from './components/MainMenu';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return <>{!gameStarted && <MainMenu />}</>;
}

export default App;
