export interface Props {
  total: number;
  pageCount: number;
  setPageCount: (newValue: number) => void;
}

export function Pagination({ total, pageCount, setPageCount }: Props) {
  const action = "border rounded-full bg-accent-500 !text-base-500";
  const hover =
    "ring-offset-2 ring-accent-500 hover:border hover:bg-accent-500 hover:text-base-500  transition duration-700 hover:ring-2";

  let pageCounts: (number | null)[] = Array(5).fill(null);
  let setPageCounts: (() => false | void)[] = Array(5).fill(() => {});

  const actionFlg1 = pageCount === 1;
  const actionFlg2 = pageCount === 2;
  const actionFlg4 =
    total >= 4 && (total === 4 ? pageCount === total : pageCount === total - 1);
  const actionFlg5 = total >= 5 && pageCount === total;
  const actionFlg3 = !actionFlg1 && !actionFlg2 && !actionFlg4 && !actionFlg5;

  if (total <= 5) {
    for (let i = 0; i < total; i++) {
      pageCounts[i] = i + 1;
      setPageCounts[i] = () => setPageCount(i + 1);
    }
  } else if (pageCount === total - 1 || pageCount === total) {
    pageCounts = [total - 4, total - 3, total - 2, total - 1, total];
    setPageCounts = [
      () => setPageCount(pageCount - 4),
      () => setPageCount(pageCount - 3),
      () => setPageCount(pageCount - 2),
      () => setPageCount(pageCount - 1),
      () => setPageCount(pageCount),
    ];
  } else {
    pageCounts = [
      pageCount - 2,
      pageCount - 1,
      pageCount,
      pageCount + 1,
      pageCount + 2,
    ];
    setPageCounts = [
      () => setPageCount(pageCount - 2),
      () => setPageCount(pageCount - 1),
      () => setPageCount(pageCount),
      () => pageCount + 1 <= total && setPageCount(pageCount + 1),
      () => pageCount + 2 <= total && setPageCount(pageCount + 2),
    ];
  }

  return (
    <div className="flex justify-center">
      <button
        className={`border border-text-500 text-text-500 rounded-full w-10 h-10 flex items-center justify-center mx-1
          ${pageCount - 1 > 0 && hover}
        `}
        onClick={() => pageCount - 1 > 0 && setPageCount(pageCount - 1)}
      >
        ＜
      </button>
      <div className="flex px-2">
        <button
          className={`w-10 h-10 flex items-center justify-center mx-1 text-text-500 rounded-full
              ${actionFlg1 && action}
              ${pageCounts[0] && hover}
            `}
          onClick={setPageCounts[0]}
        >
          {pageCounts[0]}
        </button>

        <button
          className={`w-10 h-10 flex items-center justify-center mx-1 text-text-500 rounded-full
                    ${actionFlg2 && action}
                    ${pageCounts[1] && hover}
                  `}
          onClick={setPageCounts[1]}
        >
          {pageCounts[1]}
        </button>

        <button
          className={`w-10 h-10 flex items-center justify-center mx-1 text-text-500 rounded-full
                    ${actionFlg3 && action}
                    ${pageCounts[2] && hover}
                  `}
          onClick={setPageCounts[2]}
        >
          {pageCounts[2]}
        </button>

        <button
          className={`w-10 h-10 flex items-center justify-center mx-1 text-text-500 rounded-full
                    ${actionFlg4 && action}
                    ${pageCounts[3] && hover}
                  `}
          onClick={setPageCounts[3]}
        >
          {pageCounts[3]}
        </button>

        <button
          className={`w-10 h-10 flex items-center justify-center mx-1 text-text-500 rounded-full
                    ${actionFlg5 && action}
                    ${pageCounts[4] && hover}
                    `}
          onClick={setPageCounts[4]}
        >
          {pageCounts[4]}
        </button>
      </div>
      <button
        className={`border border-text-500 text-text-500 rounded-full w-10 h-10 flex items-center justify-center mx-1
          ${pageCount + 1 <= total && hover}`}
        onClick={() => pageCount + 1 <= total && setPageCount(pageCount + 1)}
      >
        ＞
      </button>
    </div>
  );
}
