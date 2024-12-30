import { Button } from "../button/button";

export interface StoreFormControllerProps {
  cancelUrl: string;
  addOnClick?: () => void;
  deleteOnClick?: () => void;
  confirmOnClick: () => void;
  isHidden?: boolean;
}

export function StoreFormController({
  cancelUrl,
  addOnClick,
  deleteOnClick,
  confirmOnClick,
  isHidden = false,
}: StoreFormControllerProps) {
  return (
    <div className="flex justify-between w-full p-2">
      <Button value="キャンセル" type="link" href={cancelUrl} />

      <div className="flex gap-2">
        {isHidden || (
          <>
            <Button value="追加" type="button" onClick={addOnClick} />
            <Button value="削除" type="button" onClick={deleteOnClick} />
          </>
        )}
        <Button value="確認" type="button" onClick={confirmOnClick} />
      </div>
    </div>
  );
}
