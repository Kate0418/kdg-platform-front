export interface Props {
    href: string
    children?: React.ReactNode;
}

export function A ({ href, children }: Props) {
    return <a className="m-2 p-3 rounded-lg bg-[var(--accent-color)] text-[var(--base-color)]" href={href}>{children}</a>
}