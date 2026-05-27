import styles from './Board.module.css';
import { Cell } from './Cell';

type BoardProps = {
    board: string[][],
    onPlay: (row: number, col: number) => void,
    disabled: boolean,
}

export function Board({ board, onPlay }: BoardProps) {
    return (
        <div className={styles.board}>
            {board.map((row, r) => (
                <div key={r} className={styles.row}>
                    {row.map((cell, c) => (
                        <Cell key={c} value={cell} onClick={() => onPlay(r, c)} />
                    ))}
                </div>
            ))}
        </div>
    );
}
