interface Props {
  head: string;
  children?: React.ReactNode;
}
export function ScheduleColumn({ head, children }: Props) {
  return (
    <div className="border border-text-800 rounded-xl">
      <div className="bg-text-800 text-base-800 rounded-t-lg text-center h-6">
        {head}
      </div>
      <div>{children}</div>
      <div className="bg-text-800 rounded-b-lg text-center h-6" />
    </div>
  );
}
