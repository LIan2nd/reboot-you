import React from 'react';
import useSound from 'use-sound';
import clickDownSound from '../assets/sound/clickDown.mp3';
import clickUpSound from '../assets/sound/clickUp.mp3';

/**
 * Button component with sound effects
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Button content
 * @param {string} [props.type='button'] - Button type (button, submit, reset)
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.color='purple'] - Color variant
 * @param {string} [props.className] - Additional CSS classes
 */
const Button = ({
  children,
  type = 'button',
  onclick,
  color = 'purple',
  className = ''
}) => {
  const [playClickDown] = useSound(clickDownSound);
  const [playClickUp] = useSound(clickUpSound);

  // Predefined color variants to avoid dynamic class names
  const colorVariants = {
    purple: {
      light: 'bg-my-purple-light hover:bg-my-purple-light-hover',
      dark: 'dark:bg-my-purple-dark dark:hover:bg-my-purple-dark-hover'
    },
    red: {
      light: 'bg-my-red-light hover:bg-my-red-light-hover',
      dark: 'dark:bg-my-red-dark dark:hover:bg-my-red-dark-hover'
    },
    blue: {
      light: 'bg-my-blue-light hover:bg-my-blue-light-hover',
      dark: 'dark:bg-my-blue-dark dark:hover:bg-my-blue-dark-hover'
    }
  };

  // Fallback to purple if invalid color provided
  const variant = colorVariants[color] || colorVariants.purple;

  return (
    <button
      type={type}
      onMouseDown={playClickDown}
      onMouseUp={playClickUp}
      onClick={onclick}
      className={`
        font-medium rounded-md border 
        ${variant.light} ${variant.dark}
        shadow-black dark:shadow-white 
        shadow-my active:shadow-my-active 
        active:translate-[1.5px] 
        transition-all duration-75 
        py-1 px-2
        cursor-pointer
        focus:outline-none focus:ring-2 focus:ring-opacity-50
        ${className}
      `}
      aria-label={typeof children === 'string' ? children : 'Button'}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);