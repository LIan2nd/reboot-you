import React, { useState, useRef, useEffect } from 'react'
import { FaInfoCircle, FaMoon } from 'react-icons/fa';
import { FaSun } from 'react-icons/fa6';
import About from './About';
import toggleThemeSound from '../assets/sound/toggleTheme.mp3';
import toggleInfoSound from '../assets/sound/toggleInfo.mp3';
import closeInfoSound from '../assets/sound/closeInfo.mp3';
import useSound from 'use-sound';

const Header = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 125 });
  const [isDragging, setIsDragging] = useState(false);
  const [useRightPosition, setUseRightPosition] = useState(true);
  const [playToggleTheme] = useSound(toggleThemeSound);
  const [playToggleInfo] = useSound(toggleInfoSound);
  const [playCloseInfo] = useSound(closeInfoSound);

  // Initialize with system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false; // fallback for SSR
  });

  const dragStart = useRef({ x: 0, y: 0 });

  // Theme initialization and system preference detection
  useEffect(() => {
    const initializeTheme = () => {
      // Check if user has a saved preference
      // For actual implementation, uncomment these lines:
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        // User has a saved preference, use it
        const userPrefersDark = savedTheme === 'dark';
        setIsDarkMode(userPrefersDark);
        updateTheme(userPrefersDark);
        return userPrefersDark;
      }

      // No saved preference, use system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
      updateTheme(systemPrefersDark);
      return systemPrefersDark;
    };

    const currentTheme = initializeTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      // Only auto-update if user hasn't manually set a theme preference
      // For actual implementation, uncomment this check:
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setIsDarkMode(e.matches);
        updateTheme(e.matches);
      }

      // setIsDarkMode(e.matches);
      // updateTheme(e.matches);
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // Cleanup listener
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const updateTheme = (darkMode) => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    updateTheme(newDarkMode);
    playToggleTheme();

    // Save user preference to localStorage
    // For actual implementation, uncomment this line:
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');

  };

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

  const handleMouseDown = (e) => {
    setIsDragging(true);

    if (useRightPosition) {
      const newX = window.innerWidth - position.x - 384;
      setPosition({ x: newX, y: position.y });
      setUseRightPosition(false);
      dragStart.current = {
        x: e.clientX - newX,
        y: e.clientY - position.y
      };
    } else {
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
    }

    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;

    setPosition({
      x: Math.max(0, Math.min(window.innerWidth - 400, newX)),
      y: Math.max(0, Math.min(window.innerHeight - 200, newY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e) => handleMouseMove(e);
      const handleGlobalMouseUp = () => handleMouseUp();

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, position]);

  return (
    <>
      <header className='px-8 py-14 flex items-center justify-between gap-4 flex-wrap select-none transition-colors duration-300'>
        <h1 className='text-5xl font-medium hidden sm:block text-gray-900 dark:text-white'>
          L's Personal "Reboot"
        </h1>
        <div className='flex items-center gap-6'>
          {isDarkMode ? (
            <FaSun
              className='cursor-pointer active:scale-90 transition-all duration-200 ease-in-out text-yellow-500 hover:text-yellow-400 hover:rotate-12'
              size={40}
              onClick={handleThemeToggle}
              title="Switch to light mode"
            />
          ) : (
            <FaMoon
              className='cursor-pointer active:scale-90 transition-all duration-200 ease-in-out text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 hover:-rotate-12'
              size={40}
              onClick={handleThemeToggle}
              title="Switch to dark mode"
            />
          )}
          <FaInfoCircle
            className='cursor-pointer active:scale-90 transition-all duration-200 ease-in-out text-gray-700 hover:text-my-purple-dark dark:text-gray-300 dark:hover:text-my-purple-light-hover'
            size={40}
            onClick={handleInfoClick}
            title="About"
          />
        </div>
      </header>

      {showAbout && (
        <>
          <div
            className="fixed z-50 hidden sm:block"
            style={{
              ...(useRightPosition
                ? { right: `${position.x}px` }
                : { left: `${position.x}px` }
              ),
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
          <div className="fixed z-50 block sm:hidden inset-0 p-4">
            <About
              onClose={handleCloseAbout}
            />
          </div>
        </>
      )}
    </>
  )
}

export default Header;