export interface UpdateControllerProps {
  setModalFlg: React.Dispatch<React.SetStateAction<boolean>>;
  updateOnClick: () => void;
}

export function UpdateController({
  setModalFlg,
  updateOnClick,
}: UpdateControllerProps) {
  return (
    <div className="flex justify-end w-full">
      <button
        className="button"
        type="button"
        onClick={() => setModalFlg(false)}
      >
        キャンセル
      </button>
      <button className="button" type="button" onClick={updateOnClick}>
        保存
      </button>
    </div>
  );
}
