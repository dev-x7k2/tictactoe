import {createBoard, isValidMove} from "../core/board.ts";
import {checkWinner} from "../core/rules.ts";
import {useReducer} from "react";
import {getBestMove, getRandomMove} from "../core/opponent.ts";

type GameState = {
    board: string[][],
    currentPlayer: 'X' | 'O',
    phase: 'difficulty' | 'picking' | 'playing' | 'ended',
    winner: 'X' | 'O' | 'draw' | null,
    difficulty: 'easy' | 'hard'
}

type GameAction =
    | { type: 'PICK_PIECE'; payload: 'X' | 'O' }
    | { type: 'PLAY'; payload: { row: number; col: number } }
    | { type: 'RESET' }
    | { type: 'SET_DIFFICULTY'; payload: 'easy' | 'hard' }

const initialState: GameState = {
    board: createBoard(),
    currentPlayer: 'X',
    phase: 'difficulty',
    winner: null,
    difficulty: "easy"
}

function playBotMove(board: string[][], botPlayer: string, difficulty: 'easy' | 'hard' | null): string[][] {
    const move = difficulty === 'hard'
        ? getBestMove(board, botPlayer)
        : getRandomMove(board);

    return board.map((row, r) =>
        row.map((cell, c) => r === move.row && c === move.col ? botPlayer : cell)
    );
}

function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'SET_DIFFICULTY':
            return { ...state, difficulty: action.payload, phase: 'picking' };
        case 'PICK_PIECE': {
            if (action.payload === 'O') {
                const boardAfterBot = playBotMove(state.board, 'X', state.difficulty);
                return { ...state, board: boardAfterBot, currentPlayer: 'O', phase: 'playing' };
            }
            return { ...state, currentPlayer: 'X', phase: 'playing' };
        }
        case 'PLAY': {
            if (state.phase !== 'playing') return state;
            if (!isValidMove(state.board, action.payload.row, action.payload.col)) {
                return state;
            }

            const newBoard = state.board.map((row, r) =>
                row.map((cell, c) =>
                    r === action.payload.row && c === action.payload.col
                        ? state.currentPlayer
                        : cell
                )
            );

            const winner = checkWinner(newBoard);

            if (winner) {
                return { ...state, board: newBoard, phase: 'ended', winner };
            }

            const nextPlayer = state.currentPlayer === 'X' ? 'O' : 'X';

            const botBoard = playBotMove(newBoard, nextPlayer, state.difficulty);

            const aiWinner = checkWinner(botBoard);
            if (aiWinner) {
                return { ...state, board: botBoard, phase: 'ended', winner: aiWinner };
            }

            return { ...state, board: botBoard, currentPlayer: state.currentPlayer };
        }
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

export function useGame() {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    const setDifficulty = (difficulty: 'easy' | 'hard') =>
        dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });

    const pickPiece = (player: 'X' | 'O') =>
        dispatch({ type: 'PICK_PIECE', payload: player });

    const play = (row: number, col: number) =>
        dispatch({ type: 'PLAY', payload: { row, col } });

    const reset = () =>
        dispatch({ type: 'RESET' });

    return { state, pickPiece, play, reset, setDifficulty };
}