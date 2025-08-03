import React from 'react'

const Heading = ({ md, lg, xl, children }) => {
  return (
    <h2 className={`${xl ? "text-2xl md:text-3xl lg:text-4xl" : lg ? "text-xl md:text-2xl lg:text-3xl" : md ? "text-md md:text-lg" : "text-md md:text-lg"} select-none text-gray-900 dark:text-gray-100 font-bold`}>
      {children}
    </h2>
  )
}

export default Heading;