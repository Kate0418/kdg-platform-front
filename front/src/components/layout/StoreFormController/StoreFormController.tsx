export interface Props {
  cancelUrl: string;
  addOnClick: () => void;
  deleteOnClick: () => void;
  confirmOnClick: () => void;
}

export function StoreFormController({
  cancelUrl,
  addOnClick,
  deleteOnClick,
  confirmOnClick,
}: Props) {
  return (
    <div className="flex justify-between w-full">
      <a className="a" href={cancelUrl}>
        キャンセル
      </a>

      <div className="flex">
        <button className="button" type="button" onClick={addOnClick}>
          追加
        </button>
        <button className="button" type="button" onClick={deleteOnClick}>
          削除
        </button>
        <button className="button" type="button" onClick={confirmOnClick}>
          確認
        </button>
      </div>
    </div>
  );
}
