import React from "react";
import { useDraggable } from "@dnd-kit/core"; //ライブラリ

export interface DraggableProps {
  id: string;
  lessonFlg: boolean;
  children: React.ReactNode;
}

export function Draggable({ id, lessonFlg, children }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: transform ? 99 : undefined, // transformがある場合はzIndexを99に設定
  };

  return (
    <div
      className="relative h-14 pt-1"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      {lessonFlg ? (
        <div {...listeners}>
          <div className="absolute top-0 left-0 w-full h-2 bg-text-800 rounded-t-lg z-10" />
          <div className="absolute top-0 left-0 w-full h-full bg-[var(--accent-800)] rounded-t-xl rounded-b-lg" />
        </div>
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-[var(--text-800)] rounded-lg" />
      )}
      {children}
    </div>
  );
}
