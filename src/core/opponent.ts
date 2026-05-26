import { GRID_SIZE } from '../config';

export function getRandomMove(board: string[][]): { row: number, col: number } {
    const emptyCells: { row: number, col: number }[] = [];

    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (board[row][col] === '') {
                emptyCells.push({ row, col });
            }
        }
    }

    const index = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[index];
}