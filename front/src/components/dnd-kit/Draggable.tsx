import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({id: props.id,});
  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    // zIndex: transform ? 99 : undefined, // transformがある場合はzIndexを99に設定
  };
  
  return (
    <div className='relative rounded-lg h-14 pt-1' ref={setNodeRef} style={style} {...attributes}>
      { props.lessonFlg &&
        <div {...listeners}>
          <div className='absolute top-0 left-0 w-full h-2 bg-[var(--text-color)] rounded-t-lg z-20' />
          <div className='absolute top-0 left-0 w-full h-full bg-[var(--accent-color-60)] rounded-t-xl rounded-b-lg' />
        </div>
      }
      {props.children}
    </div>
  );
}