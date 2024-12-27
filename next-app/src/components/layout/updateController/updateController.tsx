import { Button } from "../button/button";

export interface UpdateControllerProps {
  setModalFlg: React.Dispatch<React.SetStateAction<boolean>>;
  updateOnClick: () => void;
}

export function UpdateController({
  setModalFlg,
  updateOnClick,
}: UpdateControllerProps) {
  return (
    <div className="flex justify-end w-full gap-2 p-2">
      <Button
        value="キャンセル"
        type="button"
        onClick={() => setModalFlg(false)}
      />
      <Button value="保存" type="button" onClick={updateOnClick} />
    </div>
  );
}
