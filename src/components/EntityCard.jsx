import React from 'react'

const EntityCard = ({children,label,value,subtitle,onClickHandler}) => {
  return (
    <div onClick={onClickHandler} className='border-[#ffffff3d] hover:border-[#fffb12bf] border p-6 hover:scale-105 cursor-pointer transition-transform text-[white] rounded-md w-1/4 '>
      {children}
      <h4 className='text-2xl font-bold my-3 mt-5'>{label}</h4>
      <p className='text-xs '>{subtitle}</p>
      <button onClick={onClickHandler} className='my-8 text-sm hover:bg-white hover:text-[black] transition-colors text-center w-1/3 mx-auto block py-1 rounded-sm bg-[#fffc12] text-black '>Sign Up</button>
    </div>
  )
}

export default EntityCard