import React from 'react'

const Input = ({ type, name, id, value, onchange, placeholder }) => {
  return (
    <input
      className='shadow-my placeholder:italic shadow-black dark:shadow-white w-auto border rounded-md py-1 px-2 focus:outline-0 focus:shadow-my-active focus:translate-[1.5px] transition-all duration-75'
      type={type} name={name} id={id} value={value} onChange={onchange} placeholder={placeholder} />
  )
}

export default Input;