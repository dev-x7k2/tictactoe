import { GRID_SIZE } from '../config';
import { checkWinner } from './rules';

function getEmptyCells(board: string[][]): { row: number, col: number }[] {
    const emptyCells: { row: number, col: number }[] = [];
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (board[row][col] === '') {
                emptyCells.push({ row, col });
            }
        }
    }
    return emptyCells;
}

export function getRandomMove(board: string[][]): { row: number, col: number } {
    const emptyCells = getEmptyCells(board);

    if (emptyCells.length === 0) {
        throw new Error('No empty cells available');
    }
    
    const index = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[index];
}

function getAdjacentMove(board: string[][], botPlayer: string): { row: number, col: number } | null {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1],
    ];

    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (board[row][col] !== botPlayer) continue;

            for (const [dr, dc] of directions) {
                const r = row + dr;
                const c = col + dc;
                if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) continue;
                if (board[r][c] === '') return { row: r, col: c };
            }
        }
    }

    return null;
}

function simulateMove(board: string[][], row: number, col: number, player: string): string[][] {
    return board.map((r, ri) =>
        r.map((cell, ci) => (ri === row && ci === col ? player : cell))
    );
}

export function getBestMove(board: string[][], botPlayer: string): { row: number, col: number } {
    const humanPlayer = botPlayer === 'X' ? 'O' : 'X';
    const emptyCells = getEmptyCells(board);

    if (emptyCells.length === 0) {
        throw new Error('No empty cells available');
    }
    
    // Verifier si le bot peut gagner ce tour
    for (const cell of emptyCells) {
        const newBoard = simulateMove(board, cell.row, cell.col, botPlayer);
        if (checkWinner(newBoard)) return cell;
    }

    // Verifier si le joueur peut gagner ce tour
    for (const cell of emptyCells) {
        const newBoard = simulateMove(board, cell.row, cell.col, humanPlayer);
        if (checkWinner(newBoard)) return cell;
    }

    // Jouer adjacent à un pion du bot
    const adjacentMove = getAdjacentMove(board, botPlayer);
    if (adjacentMove) return adjacentMove;

    // Verifier si le centre est dispo
    const center = Math.floor(GRID_SIZE / 2);
    if (board[center][center] === '') return { row: center, col: center };

    // Jouer les coins
    const corners = [
        { row: 0, col: 0 },
        { row: 0, col: GRID_SIZE - 1 },
        { row: GRID_SIZE - 1, col: 0 },
        { row: GRID_SIZE - 1, col: GRID_SIZE - 1 },
    ];
    const freeCorner = corners.find(c => board[c.row][c.col] === '');
    if (freeCorner) return freeCorner;

    // Aléatoire
    return getRandomMove(board);
}