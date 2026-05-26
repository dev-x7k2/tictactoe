import styles from './PiecePicker.module.css';

type PiecePickerProps = {
    onPick: (player: 'X' | 'O') => void,
}

export function PiecePicker({ onPick }: PiecePickerProps) {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Choisis ton pion</h2>
            <div className={styles.buttons}>
                <button className={`${styles.btn} ${styles.btnX}`} onClick={() => onPick('X')}>X</button>
                <button className={`${styles.btn} ${styles.btnO}`} onClick={() => onPick('O')}>O</button>
            </div>
        </div>
    );
}
