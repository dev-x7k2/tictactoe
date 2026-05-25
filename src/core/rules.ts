import { GRID_SIZE, WIN_LENGTH } from '../config';

export function checkWinner(board: string[][]): 'X' | 'O' | 'draw' | null {
    const directions = [
        [0, 1],   // horizontale
        [1, 0],   // verticale
        [1, 1],   // diagonale bas-droite
        [1, -1],  // diagonale bas-gauche
    ];

    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            const cell = board[row][col];
            if (cell === '') continue;

            for (const [dr, dc] of directions) {
                let count = 1;
                for (let k = 1; k < WIN_LENGTH; k++) {
                    const r = row + dr * k;
                    const c = col + dc * k;
                    if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) break;
                    if (board[r][c] !== cell) break;
                    count++;
                }
                if (count === WIN_LENGTH) return cell as 'X' | 'O';
            }
        }
    }

    const isDraw = board.every(row => row.every(cell => cell !== ''));
    if (isDraw) return 'draw';

    return null;
}