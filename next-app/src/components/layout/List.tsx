interface Props {
  title: string;
  loaderFlg?: boolean;
  children?: React.ReactNode;
  h: number;
}

export function List({ title, loaderFlg = false, children, h }: Props) {
  return (
    <div className="pt-5 pb-2">
      <div
        className="border border-text-500 rounded-xl"
        style={{ height: `calc(100vh - ${h}px)` }}
      >
        <div className="bg-text-500 text-base-500 p-1 rounded-t-lg">
          {title}
        </div>
        <div
          className="px-2 pt-2 lg:px-8 lg:pt-5 overflow-y-auto"
          style={{ height: `calc(100vh - ${h + 50}px)` }}
        >
          {loaderFlg ? (
            <div className="flex items-center justify-center h-full">
              <div className="square-spin-2" />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
