import React from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Wave from 'react-wavify';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className='px-4 md:px-8 lg:px-12 xl:px-24 m-auto relative z-10'>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout;