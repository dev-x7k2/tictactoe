type GameStatusProps = {
    winner: 'X' | 'O' | 'draw' | null,
    onReset: () => void,
}

export function GameStatus({ winner, onReset }: GameStatusProps) {
    const message = winner === 'draw' ? 'Match nul !' : `Le joueur ${winner} a gagné !`;

    return (
        <>
            <span>{message}</span>
            <button onClick={onReset}>Rejouer</button>
        </>
    );
}