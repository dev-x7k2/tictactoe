import {createBoard, isValidMove} from "../core/board.ts";
import {checkWinner} from "../core/rules.ts";
import {useReducer} from "react";
import {getRandomMove} from "../core/opponent.ts";

type GameState = {
    board: string[][],
    currentPlayer: 'X' | 'O',
    phase: 'picking' | 'playing' | 'ended',
    winner: 'X' | 'O' | 'draw' | null
}

type GameAction =
    | { type: 'PICK_PIECE'; payload: 'X' | 'O' }
    | { type: 'PLAY'; payload: { row: number; col: number } }
    | { type: 'RESET' }

const initialState: GameState = {
    board: createBoard(),
    currentPlayer: 'X',
    phase: 'picking',
    winner: null
}

function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'PICK_PIECE':
            return { ...state, currentPlayer: action.payload, phase: 'playing' };
        case 'PLAY': {
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

            const aiMove = getRandomMove(newBoard);
            const aiBoard = newBoard.map((row, r) =>
                row.map((cell, c) =>
                    r === aiMove.row && c === aiMove.col ? nextPlayer : cell
                )
            );

            const aiWinner = checkWinner(aiBoard);
            if (aiWinner) {
                return { ...state, board: aiBoard, phase: 'ended', winner: aiWinner };
            }

            return { ...state, board: aiBoard, currentPlayer: state.currentPlayer };
        }
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

export function useGame() {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    const pickPiece = (player: 'X' | 'O') =>
        dispatch({ type: 'PICK_PIECE', payload: player });

    const play = (row: number, col: number) =>
        dispatch({ type: 'PLAY', payload: { row, col } });

    const reset = () =>
        dispatch({ type: 'RESET' });

    return { state, pickPiece, play, reset };
}