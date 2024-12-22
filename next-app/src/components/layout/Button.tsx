export interface Props {
  className?: string;
  type: "submit" | "reset" | "button" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

export function Button({ className, type, onClick, children }: Props) {
  return (
    <button
      className={`m-2 p-3 rounded-lg bg-accent-800 text-base-800 ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
