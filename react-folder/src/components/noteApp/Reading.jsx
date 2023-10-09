import React, { useRef } from 'react'
import {GrClose} from 'react-icons/gr'
const Reading =(props)=> {
    const {readItem,CloseRead,}=props
  return (
    <>
        <div className={`${readItem?"scale-100":"scale-0"} absolute top-[15px] left-1/2 transform translate-x-[-50%] flex flex-col items-center z-50 group transition-all duration-500 ease-in-out`} onClick={CloseRead}>
            <p className="bg-gray-800 px-3 py-0.5 rounded-full text-white capitalize scale-0 group-hover:scale-100 transition-all duration-500">Close</p>
            <GrClose className=" w-7 h-7 text-red-800 cursor-pointer"/>
        </div>
        <div className={`${readItem?"scale-100":"scale-0"} fixed left-1/2 top-1/2 transform translate-x-[-50%] translate-y-[-50%] overflow-y-scroll w-full max-w-5xl py-5 px-2 h-[80vh] bg-gray-300 z-20 rounded-lg shadow-2xl transition-all duration-500 ease-in-out`}>
            <div>
                <h1 className="text-center capitalize font-semibold text-lg">{readItem.tittle}</h1>
                <p >{readItem.content}</p>
            </div>
        </div>
   </> 
  )
}

export default Reading