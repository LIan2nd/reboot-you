import React from 'react';
import { BiCheck, BiTrash } from 'react-icons/bi';
import useSound from 'use-sound';
import deleteSound from '../assets/sound/deleteSound.mp3';
import completeSound from '../assets/sound/completeSound.mp3';

const ListItem = ({ name, done, completedClick, checkbox, deleteClick, id }) => {
  const [playDelete] = useSound(deleteSound);
  const [playComplete] = useSound(completeSound);

  return (
    <li onClick={() => {
      checkbox && playComplete();
      completedClick();
    }} className={`py-2 px-4 ${done && 'bg-white-hover dark:bg-black-hover line-through'} select-none border-1 border-l-4 border-black dark:border-white rounded-md flex items-center justify-between shadow-sm shadow-black dark:shadow-white transition-all duration-75`}>
      {name}
      <div className='flex gap-2 items-center'>
        {!!checkbox && (
          <div className={`w-4 h-4 border-1 border-black dark:border-white flex items-center justify-center`}>
            {done && <BiCheck />}
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            playDelete();
            deleteClick(e, id);
          }}
          className='cursor-pointer'
        >
          <BiTrash size={18} />
        </button>
      </div>
    </li >
  )
}

export default ListItem