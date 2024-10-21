export interface Props {
    type: "submit" | "reset" | "button" | undefined,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    children?: React.ReactNode;
}

export function Button ({ type, onClick, children }: Props) {
    return <button className="m-2 p-3 rounded-lg bg-[var(--accent-color)] text-[var(--base-color)]" type={type} onClick={onClick}>{children}</button>
}