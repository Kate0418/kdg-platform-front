export interface Props {
  className?: string;
  href: string;
  children?: React.ReactNode;
}

export function A({ className, href, children }: Props) {
  return (
    <a
      className={`m-2 p-3 rounded-lg bg-accent-500 text-base-500 ${className}`}
      href={href}
    >
      {children}
    </a>
  );
}
