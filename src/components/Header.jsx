import React, { useState, useRef, useEffect } from 'react';
import { FaInfoCircle, FaMoon } from 'react-icons/fa';
import { FaSun } from 'react-icons/fa6';
import About from './About';
import toggleThemeSound from '../assets/sound/toggleTheme.mp3';
import toggleInfoSound from '../assets/sound/toggleInfo.mp3';
import closeInfoSound from '../assets/sound/closeInfo.mp3';
import useSound from 'use-sound';

/**
 * Header component with theme toggle and about modal
 * Features:
 * - Dark/light theme toggle with system preference detection
 * - Draggable about modal
 * - Sound effects for interactions
 */
const Header = () => {
  // State for about modal visibility and position
  const [showAbout, setShowAbout] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 125 });
  const [isDragging, setIsDragging] = useState(false);
  const [useRightPosition, setUseRightPosition] = useState(true);

  // Sound effects
  const [playToggleTheme] = useSound(toggleThemeSound);
  const [playToggleInfo] = useSound(toggleInfoSound);
  const [playCloseInfo] = useSound(closeInfoSound);

  // Theme state with system preference detection
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const dragStart = useRef({ x: 0, y: 0 });

  // Initialize theme and set up system preference listener
  useEffect(() => {
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        const userPrefersDark = savedTheme === 'dark';
        setIsDarkMode(userPrefersDark);
        updateTheme(userPrefersDark);
        return userPrefersDark;
      }

      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
      updateTheme(systemPrefersDark);
      return systemPrefersDark;
    };

    initializeTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setIsDarkMode(e.matches);
        updateTheme(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  // Update document class for dark mode
  const updateTheme = (darkMode) => {
    document.documentElement.classList.toggle('dark', darkMode);
  };

  // Toggle theme handler
  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    updateTheme(newDarkMode);
    playToggleTheme();
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  // About modal handlers
  const handleInfoClick = () => {
    setShowAbout(!showAbout);
    if (!showAbout) {
      setUseRightPosition(true);
      setPosition({ x: 100, y: 125 });
    }
    playToggleInfo();
  };

  const handleCloseAbout = () => {
    playCloseInfo();
    setShowAbout(false);
  };

  // Draggable modal handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const newX = useRightPosition ? window.innerWidth - position.x - 384 : position.x;
    setUseRightPosition(false);
    dragStart.current = {
      x: e.clientX - newX,
      y: e.clientY - position.y
    };
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = Math.max(0, Math.min(window.innerWidth - 400, e.clientX - dragStart.current.x));
    const newY = Math.max(0, Math.min(window.innerHeight - 200, e.clientY - dragStart.current.y));
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Global mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <>
      <header className="px-8 py-14 flex items-center justify-between gap-4 flex-wrap select-none transition-colors duration-300">
        <h1 className="text-5xl font-medium hidden sm:block text-gray-900 dark:text-white">
          L's Personal "Reboot"
        </h1>

        <div className="flex items-center gap-6">
          {isDarkMode ? (
            <FaSun
              className="cursor-pointer active:scale-90 transition-all duration-200 ease-in-out text-yellow-500 hover:text-yellow-400 hover:rotate-12"
              size={40}
              onClick={handleThemeToggle}
              title="Switch to light mode"
            />
          ) : (
            <FaMoon
              className="cursor-pointer active:scale-90 transition-all duration-200 ease-in-out text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:-rotate-12"
              size={40}
              onClick={handleThemeToggle}
              title="Switch to dark mode"
            />
          )}

          <FaInfoCircle
            className="cursor-pointer active:scale-90 transition-all duration-200 ease-in-out text-gray-700 hover:text-my-purple-dark dark:text-gray-300 dark:hover:text-my-purple-light-hover"
            size={40}
            onClick={handleInfoClick}
            title="About"
          />
        </div>
      </header>

      {/* About Modal */}
      {showAbout && (
        <>
          <div
            className="fixed z-50 hidden sm:block"
            style={{
              ...(useRightPosition
                ? { right: `${position.x}px` }
                : { left: `${position.x}px` }),
              top: `${position.y}px`,
              transform: isDragging ? 'scale(1.02)' : 'scale(1)',
              transition: isDragging ? 'none' : 'transform 0.1s ease'
            }}
          >
            <About
              onClose={handleCloseAbout}
              onMouseDown={handleMouseDown}
              isDragging={isDragging}
            />
          </div>

          {/* Mobile version */}
          <div className="fixed z-50 block sm:hidden inset-0 p-4">
            <About onClose={handleCloseAbout} />
          </div>
        </>
      )}
    </>
  );
};

export default Header;