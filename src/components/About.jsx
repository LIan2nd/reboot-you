import React from 'react'
import { FaTimes } from 'react-icons/fa';
import Heading from './Heading';

const About = ({ onClose, onMouseDown, isDragging }) => {
  const handleHeaderMouseDown = (e) => {
    // Jangan handle drag jika tidak ada onMouseDown (mobile version)
    if (!onMouseDown) return;

    // Cegah drag jika klik tombol close
    if (e.target.closest('.close-btn')) {
      e.stopPropagation();
      return;
    }

    onMouseDown(e);
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className={`w-[700px] max-w-sm border border-black dark:border-white shadow-my-lg shadow-black dark:shadow-white rounded-xl bg-white dark:bg-black transition-all duration-200 ease-out ${isDragging ? 'shadow-2xl ring-2 ring-blue-300/50' : ''
      }`}>
      <div
        className={`border-b-2 border-black dark:border-white px-4 py-2 bg-my-sky dark:bg-my-midnight text-gray-100 rounded-t-xl flex items-center justify-between select-none user-select-none transition-colors duration-200 cursor-default`}
        onMouseDown={handleHeaderMouseDown}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}
      >
        <Heading lg >
          About
        </Heading>
        <FaTimes
          className='close-btn hover:text-red-400 hover:scale-125 transition-all duration-200 z-10 '
          size={24}
          onClick={handleCloseClick}
        />
      </div>
      <div className='p-4 md:p-8 select-text cursor-default h-[500px] overflow-y-auto'>
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
          Aku adalah orang yang sangat butuh dorongan, butuh motivasi. Motivasi emang sifatnya sementara, disiplinlah yang berperan penting dan "long lasting".
          Tapi untuk membangun disiplin itu agaknya aku tetep butuh motivasi dan dorongan untuk "memulai", soo Aku membutuhkan "alat" untuk bisa selalu memotivasiku untuk disiplin setiap hari.
          <br /><br />
          Selain itu, aku butuh yang namanya task management, dan rutinitas yang harus Aku lakukan setiap hari&mdash;task rutinan itu harus selalu ada untuk mengingatkanku untuk "absen".
          <br /><br />
          Jadi, terbuatlah web ini untuk selalu mengingatkanku agar selalu disiplin, n keep on the track to the top.
        </p>
      </div>
    </div>
  )
}

export default About;