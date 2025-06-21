import React, { useState } from 'react'
import { LuCheck, LuPencil } from 'react-icons/lu'

const TitleInput = ({ title, setTitle }) => {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className='flex items-center gap-3  p-4 rounded-lg'>
      {showInput ? (
        <>
          <input 
            type="text"
            placeholder='Resume title'
            className='text-sm md:text-[17px] bg-gray-800/50 backdrop-blur-sm outline-none text-white font-semibold border-b-2 border-gray-600 focus:border-purple-500 pb-2 px-3 py-1 rounded-t-lg placeholder-gray-400 transition-all duration-200'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <button 
            className='cursor-pointer p-2 rounded-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-green-500/25'
            onClick={() => setShowInput((prevState) => !prevState)}
          >
            <LuCheck className='text-[16px] text-white' />
          </button>
        </>
      ) : (
        <>
          <h2 className='text-sm md:text-[17px] font-semibold text-white bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent'>
            {title}
          </h2>
          <button 
            className='cursor-pointer p-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25'
            onClick={() => setShowInput((prevState) => !prevState)}
          >
            <LuPencil className="text-sm text-white" />
          </button>
        </>
      )}
    </div>
  )
}

export default TitleInput