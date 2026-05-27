import './App.css';
import { useGame } from './hooks/useGame';
import { Board } from './components/Board';
import { PiecePicker } from './components/PiecePicker';
import { GameStatus } from './components/GameStatus';
import {DifficultyPicker} from "./components/DifficultyPicker.tsx";

export default function App() {
  const { state, pickPiece, play, reset, setDifficulty } = useGame();
  
  return (
    <div className="app">
      {state.phase === 'difficulty' && (
          <DifficultyPicker onPick={setDifficulty} />
      )}
      
      {state.phase === 'picking' && (
        <PiecePicker onPick={pickPiece} />
      )}

      {state.phase === 'playing' && (
          <Board board={state.board} onPlay={play} disabled={false} />
      )}

      {state.phase === 'ended' && (
        <>
          <Board board={state.board} onPlay={play} disabled={true} />
          <GameStatus winner={state.winner} onReset={reset} />
        </>
      )}
    </div>
  );
}
