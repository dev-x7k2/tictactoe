import styles from './DifficultyPicker.module.css';

type DifficultyPickerProps = {
    onPick: (difficulty: "easy" | "hard") => void
}

export function DifficultyPicker({ onPick }: DifficultyPickerProps) {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Choisis la difficulté</h2>
            <div className={styles.buttons}>
                <button className={`${styles.btn} ${styles.easy}`} onClick={() => onPick('easy')}>Facile</button>
                <button className={`${styles.btn} ${styles.hard}`} onClick={() => onPick('hard')}>Difficile</button>
            </div>
        </div>
    );
}
