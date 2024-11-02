interface Props {
  head: string;
  children?: React.ReactNode;
}
export function ScheduleColumn({ head, children }: Props) {
  return (
    <div className="border border-[var(--text-color)] rounded-xl">
      <div className="bg-[var(--text-color)] text-[var(--base-color)] rounded-t-lg text-center h-6">
        {head}
      </div>
      <div>{children}</div>
      <div className="bg-[var(--text-color)] rounded-b-lg text-center h-6" />
    </div>
  );
}
