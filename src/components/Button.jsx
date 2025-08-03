import React from 'react'
import useSound from 'use-sound';
import clickDownSound from '../assets/sound/clickDown.mp3';
import clickUpSound from '../assets/sound/clickUp.mp3';

const Button = ({ children, type, onclick, color }) => {
  const [playClickDown] = useSound(clickDownSound);
  const [playClickUp] = useSound(clickUpSound);

  return (
    <button
      onMouseDown={playClickDown}
      onMouseUp={playClickUp}
      type={type} className={`font-medium rounded-md border bg-my-${color}-light hover:bg-my-${color}-light-hover dark:bg-my-${color}-dark dark:hover:bg-my-${color}-dark-hover shadow-black dark:shadow-white cursor-pointer shadow-my active:shadow-my-active active:translate-[1.5px] transition-all duration-75 py-1 px-2`} onClick={onclick}>
      {children}
    </button>
  )
}

export default Button;