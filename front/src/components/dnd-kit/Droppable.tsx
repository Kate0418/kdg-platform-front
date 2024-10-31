import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  
  return (
    <div ref={setNodeRef} className='border-b border-[var(--text-color)] p-1'>
      {props.children}
    </div>
  );
}