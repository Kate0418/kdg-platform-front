import { Button } from "../button/button";

export interface StoreModalControllerProps {
  setModalFlg: React.Dispatch<React.SetStateAction<boolean>>;
  storeOnClick: () => void;
}

export function StoreModalController({
  setModalFlg,
  storeOnClick,
}: StoreModalControllerProps) {
  return (
    <div className="flex justify-end w-full gap-2 p-2">
      <Button value="戻る" type="button" onClick={() => setModalFlg(false)} />
      <Button value="登録" type="button" onClick={storeOnClick} />
    </div>
  );
}
