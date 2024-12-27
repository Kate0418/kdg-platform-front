import { Button } from "../button/button";

export interface EditToolbarProps {
  isShow: boolean;
  isHiddenEdit?: boolean;
  onClickEdit?: () => void;
  onClickDelete: () => void;
}

export function EditToolbar({
  isShow,
  isHiddenEdit = false,
  onClickEdit,
  onClickDelete,
}: EditToolbarProps) {
  return (
    <>
      {isShow && (
        <div
          className="fixed rounded-lg bg-text-500 bottom-5 right-5 p-3 z-20 border border-text-500
          animate-slide-in-blurred-bottom"
        >
          <div className="flex gap-2">
            {isHiddenEdit || (
              <Button
                className="!p-3"
                value="一括編集"
                type="button"
                onClick={onClickEdit}
              />
            )}
            <Button
              className="!p-3"
              value="一括削除"
              type="button"
              onClick={onClickDelete}
            />
          </div>
        </div>
      )}
    </>
  );
}
