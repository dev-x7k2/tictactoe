type PiecePickerProps = {
    onPick: (player: 'X' | 'O') => void,
}

export function PiecePicker({ onPick }: PiecePickerProps) {
    return (
        <div>
            <h2>Choisis ton pion</h2>
            <button onClick={() => onPick('X')}>X</button>
            <button onClick={() => onPick('O')}>O</button>
        </div>
    );
}