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
        <div className="fixed rounded-lg bg-white bottom-5 right-5 p-2 z-20 border border-text">
          {isHiddenEdit || (
            <button className="button" onClick={onClickEdit}>
              一括編集
            </button>
          )}
          <button className="button" onClick={onClickDelete}>
            一括削除
          </button>
        </div>
      )}
    </>
  );
}
