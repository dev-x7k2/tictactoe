import './App.css';
import { useGame } from './hooks/useGame';
import { Board } from './components/Board';
import { PiecePicker } from './components/PiecePicker';
import { GameStatus } from './components/GameStatus';

export default function App() {
  const { state, pickPiece, play, reset } = useGame();

  return (
    <div className="app">
      {state.phase === 'picking' && (
        <PiecePicker onPick={pickPiece} />
      )}

      {state.phase === 'playing' && (
        <Board board={state.board} onPlay={play} />
      )}

      {state.phase === 'ended' && (
        <>
          <Board board={state.board} onPlay={play} />
          <GameStatus winner={state.winner} onReset={reset} />
        </>
      )}
    </div>
  );
}
