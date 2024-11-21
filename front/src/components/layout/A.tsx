export interface Props {
  className?: string;
  href: string;
  children?: React.ReactNode;
}

export function A({ className, href, children }: Props) {
  return (
    <a
      className={`m-2 p-3 rounded-lg bg-accent text-base ${className}`}
      href={href}
    >
      {children}
    </a>
  );
}
