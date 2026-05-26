import styles from './GameStatus.module.css';

type GameStatusProps = {
    winner: 'X' | 'O' | 'draw' | null,
    onReset: () => void,
}

export function GameStatus({ winner, onReset }: GameStatusProps) {
    const message = winner === 'draw' ? 'Match nul !' : `Le joueur ${winner} a gagné !`;

    return (
        <div className={styles.container}>
            <span className={styles.message}>{message}</span>
            <button className={styles.resetBtn} onClick={onReset}>Rejouer</button>
        </div>
    );
}
