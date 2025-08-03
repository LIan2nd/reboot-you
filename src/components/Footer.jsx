import React from 'react'
import { BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs';

const Footer = () => {
  return (
    <>
      <footer className='pt-16 pb-8 w-full flex justify-center items-center flex-col gap-2 relative z-10 space-y-4'>
        <ul className='flex items-center gap-4'>
          <li>
            <a href="https://github.com/LIan2nd" target='_blank'>
              <BsGithub size={24} />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/alfian-nur-usyaid/">
              <BsLinkedin size={24} />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/lforthissielu/">
              <BsInstagram size={24} />
            </a>
          </li>
        </ul>
        <p>&copy; 2025 Alfian Nur Usyaid</p>
      </footer>
    </>

  )
}

export default Footer;