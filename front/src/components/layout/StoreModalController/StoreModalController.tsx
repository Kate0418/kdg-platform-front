export interface Props {
  setModalFlg: React.Dispatch<React.SetStateAction<boolean>>;
  storeOnClick: () => void;
}

export function StoreModalController({ setModalFlg, storeOnClick }: Props) {
  return (
    <div className="flex justify-end w-full">
      <button
        className="button"
        type="button"
        onClick={() => setModalFlg(false)}
      >
        戻る
      </button>
      <button className="button" type="button" onClick={storeOnClick}>
        登録
      </button>
    </div>
  );
}
