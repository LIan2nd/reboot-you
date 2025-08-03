import React from 'react'

const ListContainer = ({ children }) => {
  return (
    <ul className='mb-6 space-y-2'>
      {children}
    </ul>
  )
}

export default ListContainer;