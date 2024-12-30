export interface PaginationProps {
  total: number;
  pageCount: number;
  setPageCount: (newValue: number) => void;
}

export function Pagination({
  total,
  pageCount,
  setPageCount,
}: PaginationProps) {
  const childrens = (
    pageCount === 1 || pageCount === 2
      ? [1, 2, 3, 4, 5]
      : pageCount === total || pageCount === total - 1
        ? [total - 4, total - 3, total - 2, total - 1, total]
        : [
            pageCount - 2,
            pageCount - 1,
            pageCount,
            pageCount + 1,
            pageCount + 2,
          ]
  ).map((children) => (children > 0 && children <= total ? children : ""));
  const buttonClass =
    "text-text-500 rounded-full w-10 h-10 flex items-center justify-center font-bold";
  const hoverClass =
    "transition duration-700 hover:ring-2 hover:ring-accent-500 hover:ring-offset-2";

  return (
    <div className="flex justify-center gap-2">
      <button
        className={`
          border border-text-500
          ${buttonClass}
          ${pageCount - 1 ? hoverClass : ""}
        `}
        onClick={() => pageCount - 1 > 0 && setPageCount(pageCount - 1)}
      >
        ＜
      </button>
      {childrens.map((children, index) => (
        <button
          key={index}
          className={`
            ${buttonClass}
            ${children === pageCount && "border rounded-full bg-accent-500 !text-base-500"}
            ${typeof children === "number" && children !== pageCount ? hoverClass : ""}
            `}
          onClick={() =>
            typeof children === "number" &&
            children !== pageCount &&
            setPageCount(children)
          }
        >
          {children}
        </button>
      ))}
      <button
        className={`
          border border-text-500
          ${buttonClass}
          ${pageCount + 1 <= total ? hoverClass : ""}
        `}
        onClick={() => pageCount + 1 <= total && setPageCount(pageCount + 1)}
      >
        ＞
      </button>
    </div>
  );
}
