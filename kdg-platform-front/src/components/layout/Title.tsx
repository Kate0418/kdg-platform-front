interface Props {
  label: string;
  children: React.ReactNode;
}

export function Title({ label, children }: Props) {
  return (
    <div className="border-b border-text-500 w-full">
      <div className="text-2xl lg:text-3xl pl-2 pb-2 flex items-center gap-2">
        {children}
        {label}
      </div>
    </div>
  );
}
