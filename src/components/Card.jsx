import React from 'react'
import Heading from './Heading';

const Card = ({ children, additionalClass, title }) => {
  return (
    <div className={`${additionalClass} border border-black dark:border-white shadow-my-lg shadow-black dark:shadow-white rounded-xl bg-white dark:bg-black`}>
      <div className='border-b-2 border-black dark:border-white px-4 py-2 bg-my-sky dark:bg-my-midnight text-gray-100 rounded-t-xl' aria-hidden='true'>
        <Heading lg>
          {title}
        </Heading>
      </div>
      <div className='p-4 md:p-8'>
        {children}
      </div>
    </div>
  )
}

export default Card;