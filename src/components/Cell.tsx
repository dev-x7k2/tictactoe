type CellProps = {
    value: string,
    onClick: () => void,
}

export function Cell({ value, onClick }: CellProps) {
    return (
        <button onClick={onClick}>
            {value}
        </button>
    );
}