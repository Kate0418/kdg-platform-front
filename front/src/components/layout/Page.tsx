export interface Props {
    total: number
    pageCount: number
    setPageCount: (newValue: number) => void;
}

export function Page({total, pageCount, setPageCount}: Props) {
    const action = "border rounded-full bg-[var(--text-color)] text-[var(--base-color)]";

    let pageCounts: (number | null)[] = Array(5).fill(null);
    let setPageCounts: (() => false | void)[] = Array(5).fill(() => {});;

    let actionFlg1 = pageCount === 1;
    let actionFlg2 = pageCount === 2;
    let actionFlg4 = total >= 4 && (total === 4 ? pageCount === total : pageCount === total - 1);
    let actionFlg5 = total >= 5 && pageCount === total;
    let actionFlg3 = !actionFlg1 &&  !actionFlg2 && !actionFlg4 && !actionFlg5;

    if (total <= 5) {
        for (let i = 0; i < total; i++) {
            pageCounts[i] = i + 1;
            setPageCounts[i] = () => setPageCount(i + 1);
        }
    } else if (pageCount === total - 1 || pageCount === total) {
        pageCounts = [total-4, total-3, total-2, total-1, total];
        setPageCounts = [
            () => setPageCount(pageCount - 4),
            () => setPageCount(pageCount - 3),
            () => setPageCount(pageCount - 2),
            () => setPageCount(pageCount - 1),
            () => setPageCount(pageCount),
        ]
    } else {
        pageCounts = [pageCount-2, pageCount-1, pageCount, pageCount+1, pageCount+2];
        setPageCounts = [
            () => setPageCount(pageCount - 2),
            () => setPageCount(pageCount - 1),
            () => setPageCount(pageCount),
            () => pageCount + 1 <= total && setPageCount(pageCount + 1),
            () => pageCount + 2 <= total && setPageCount(pageCount + 2),
        ]
    }

    return (
        <div className="flex justify-center">
            <button className="border border-[var(--text-color)] rounded-full w-10 h-10 flex items-center justify-center mx-1 text-base"
                onClick={() => pageCount-1 > 0 && setPageCount(pageCount-1)}
            >＜</button>
            <div className="flex px-2">
                <button className={
                    `w-10 h-10 flex items-center justify-center mx-1 text-base
                    ${actionFlg1 && action}`
                } onClick={setPageCounts[0]}>
                    {pageCounts[0]}
                </button>

                <button className={
                    `w-10 h-10 flex items-center justify-center mx-1 text-base
                    ${actionFlg2 && action}`
                } onClick={setPageCounts[1]}>
                    {pageCounts[1]}
                </button>

                <button className={
                    `w-10 h-10 flex items-center justify-center mx-1 text-base
                    ${actionFlg3 && action}`
                } onClick={setPageCounts[2]}>
                    {pageCounts[2]}
                </button>
                
                <button className={
                    `w-10 h-10 flex items-center justify-center mx-1 text-base
                    ${actionFlg4 && action}`
                } onClick={setPageCounts[3]}>
                    {pageCounts[3]}
                </button>
                
                <button className={
                    `w-10 h-10 flex items-center justify-center mx-1 text-base
                    ${actionFlg5 && action}`
                } onClick={setPageCounts[4]}>
                    {pageCounts[4]}
                </button>
            </div>
            <button className="border border-[var(--text-color)] rounded-full w-10 h-10 flex items-center justify-center mx-1 text-base"
                onClick={() => pageCount + 1 <= total && setPageCount(pageCount+1)}
            >＞</button>
        </div>
    )
}