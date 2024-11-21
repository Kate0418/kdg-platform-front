interface Props {
  head: string;
  children?: React.ReactNode;
}
export function ScheduleColumn({ head, children }: Props) {
  return (
    <div className="border border-text rounded-xl">
      <div className="bg-text text-base rounded-t-lg text-center h-6">
        {head}
      </div>
      <div>{children}</div>
      <div className="bg-text rounded-b-lg text-center h-6" />
    </div>
  );
}
