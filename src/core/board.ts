import {GRID_SIZE} from '../config';

export function createBoard(): string[][] {
    return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(''));
}

export function isValidMove(board: string[][], row: number, col: number): boolean {
    return board[row][col] === '';
}