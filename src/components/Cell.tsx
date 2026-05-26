import styles from './Cell.module.css';

type CellProps = {
    value: string,
    onClick: () => void,
}

export function Cell({ value, onClick }: CellProps) {
    const cls = [
        styles.cell,
        value === 'X' ? styles.x : '',
        value === 'O' ? styles.o : '',
    ].filter(Boolean).join(' ');

    return (
        <button className={cls} onClick={onClick} disabled={value !== ''}>
            {value}
        </button>
    );
}
