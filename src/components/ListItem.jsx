import React from 'react';
import { BiCheck, BiTrash } from 'react-icons/bi';
import useSound from 'use-sound';
import deleteSound from '../assets/sound/deleteSound.mp3';
import completeSound from '../assets/sound/completeSound.mp3';

/**
 * ListItem component for displaying and managing todo items
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Item name/text
 * @param {boolean} props.done - Completion status
 * @param {Function} props.completedClick - Handler for completion toggle
 * @param {boolean} props.checkbox - Whether to show checkbox
 * @param {Function} props.deleteClick - Handler for delete action
 * @param {string|number} props.id - Item identifier
 */
const ListItem = ({
  name,
  done,
  completedClick,
  checkbox,
  deleteClick,
  id
}) => {
  const [playDelete] = useSound(deleteSound);
  const [playComplete] = useSound(completeSound);

  /**
   * Handles the delete button click
   * @param {Event} e - Click event
   */
  const handleDelete = (e) => {
    e.stopPropagation();
    playDelete();
    deleteClick(e, id);
  };

  /**
   * Handles the item click (for completion)
   */
  const handleItemClick = () => {
    if (checkbox) {
      playComplete();
    }
    completedClick();
  };

  return (
    <li
      onClick={handleItemClick}
      className={`
        py-2 px-4 
        ${done ? 'bg-white-hover dark:bg-black-hover line-through' : ''}
        select-none 
        border-1 border-l-4 border-black dark:border-white 
        rounded-md 
        flex items-center justify-between 
        shadow-sm shadow-black dark:shadow-white 
        transition-all duration-75
        hover:bg-gray-100 dark:hover:bg-gray-800
      `}
    >
      <span className="flex-1 truncate">{name}</span>

      <div className="flex gap-2 items-center">
        {checkbox && (
          <div className={`
            w-4 h-4 
            border-1 border-black dark:border-white 
            flex items-center justify-center
            ${done ? 'bg-green-100 dark:bg-green-900' : ''}
          `}>
            {done && <BiCheck className="text-green-600 dark:text-green-300" />}
          </div>
        )}

        <button
          onClick={handleDelete}
          className="
            cursor-pointer 
            text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300
            transition-colors duration-150
          "
          aria-label="Delete item"
        >
          <BiTrash size={18} />
        </button>
      </div>
    </li>
  );
};

export default React.memo(ListItem);