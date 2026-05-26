import { Cell } from './Cell';

type BoardProps = {
    board: string[][],
    onPlay: (row: number, col: number) => void,
}

export function Board({ board, onPlay }: BoardProps) {
    return (
        <div>
            {board.map((row, r) => (
                <div key={r}>
                    {row.map((cell, c) => (
                        <Cell key={c} value={cell} onClick={() => onPlay(r, c)} />
                    ))}
                </div>
            ))}
        </div>
    );
}