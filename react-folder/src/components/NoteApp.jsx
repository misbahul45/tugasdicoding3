import React, {  useEffect, useState } from 'react'
import {AiFillDelete,AiFillEdit,AiOutlineSearch,AiFillRead,AiOutlineMore,AiFillSetting} from 'react-icons/ai'    
import { useRef } from 'react'
import LeftBar from './noteApp/Form'
import Reading from './noteApp/Reading'
const NoteApp = () => {
    const firstActive=useRef()
    const [content,setContent]=useState(JSON.parse(localStorage.getItem("All Notte"))||[])
    const [searchItem,setSearchItem]=useState([])
    const [searchDisplay,setSearchDisplay]=useState(false)
    const [allData,setAllData]=useState([])
    const [arsip,setArsip]=useState(JSON.parse(localStorage.getItem("All Arsip"))||[])
    const [activeArsip,setActiveArsip]=useState(false)
    const [editItem,setEditItem]=useState("")
    const [readItem,setReadItem]=useState("")
    const [erorTitle,setErorTitle]=useState("")
    const [colorEdit,setColorEdit]=useState(false)
    const actived=useRef()
    const activeInput=()=>{
        actived.current.tittle.focus() 
    }
    useEffect(()=>{
       localStorage.setItem("All Notte",JSON.stringify(content)) 
    },[content])
    useEffect(()=>{
        localStorage.setItem("All Arsip",JSON.stringify(arsip)) 
     },[arsip])
    const handleForm=(e)=>{
        e.preventDefault()
        if(editItem){
            if(editItem.arsip){
                const indexItem=arsip.findIndex((item)=>item.id===editItem.id)
                arsip[indexItem]={
                    id:editItem.id,
                    tittle:e.target.tittle.value,
                    body:e.target.content.value,
                    craetedAt:new Date().toLocaleString(),
                    archived:editItem.archived
                }
                setArsip([...arsip])
                setEditItem("")
                setSearchItem([])
            }else{
                const indexItem=content.findIndex((item)=>item.id===editItem.id)
                content[indexItem]={
                    id:editItem.id,
                    tittle:e.target.tittle.value,
                    body:e.target.content.value,
                    createdAt:new Date().toLocaleString(),
                    archived:editItem.archived
                }
                setContent([...content])
                setEditItem("")
                setSearchItem([])
            }
            e.target.tittle.value=""
            e.target.content.value=""
            setColorEdit(false)
        }else{
            if(e.target.tittle.value===""){
                setErorTitle("Please fill the tittle")
                setTimeout(()=>{
                    setErorTitle("")
                },1000)
            }else if(e.target.tittle.value.length>50){
                setErorTitle("Tittle must be less than 50")
                setTimeout(()=>{
                    setErorTitle("")
                },1000)
            }else{
                setContent([...content,{
                    id:new Date().getTime(),
                    tittle:e.target.tittle.value,
                    body:e.target.content.value,
                    createdAt:new Date().getTime().toLocaleString(),
                    archived:false
                }])
                e.target.tittle.value=""
                e.target.content.value=""
                setSearchItem([])
            }
        }
    }
    const searchNote=(e)=>{
        const allArray=[...content,...arsip]
        setSearchDisplay(true)
        setAllData(allArray)
        const data=allArray.filter((item)=>item.tittle.toLowerCase().includes(e.target.value.toLowerCase()))
        if(data.length==0){
            setSearchItem(allArray)
        }else{
            setSearchItem(data)
        }
        if(e.target.value==""){
           setSearchItem([])
           setSearchDisplay(false)
           setAllData([])
        }
    }

    const deleteNote=(id)=>{
        setContent(content.filter((item)=>item.id!==id))  
    }
    const handleEditItem=(id)=>{
        const item=content.find((item)=>item.id===id)
        setEditItem(item)
        setColorEdit(true)
    }
    const handleRead=(id)=>{
        const item=content.find((item)=>item.id===id)
        setReadItem(item)
    }
    const closeRead=()=>{
        setReadItem("")
    }
    const handleArsip=(id)=>{
        let itemArsip=content.find((item)=>item.id===id)
        itemArsip={
            id:itemArsip.id,
            tittle:itemArsip.tittle,
            body:itemArsip.body,
            createdAt:itemArsip.createdAt,
            archived:true
        }
        const findIndex=arsip.findIndex((item)=>item.id===id)
        if(findIndex===-1){
            setArsip([...arsip,itemArsip])
        }
        setContent(
           content.filter((item)=>item.id!==id)
        )
    }
    const handleCancleArsip=(id)=>{
      const item=arsip.find((item)=>item.id===id)
      item.arsip=false
       setContent([...content,item])
        setArsip(arsip.filter((item)=>item.id!==id))
    }
    const displayArsip=()=>{
        setActiveArsip(true)
    }
    const cancleDisplayArsip=()=>{
        setActiveArsip(false)
    }
    const deleteArsip=(id)=>{
        setArsip(arsip.filter((item)=>item.id!==id))
    }
    const editArsip=(id)=>{
        setEditItem(arsip.find((item)=>item.id===id))
        setColorEdit(true)
    }
    const readArsip=(id)=>{
        setReadItem(arsip.find((item)=>item.id===id))
    }
  return (
    <div>
         <div className="absolute top-0 right-2 flex items-center group z-10" >
                <div className="bg-gray-800 px-3 py-2 rounded-lg text-white capitalize scale-0 group-hover:scale-100 transition-all duration-500">
                    <p className="hover:border-b-2 hover:border-blue-500 cursor-pointer" onClick={displayArsip}>Display Arsip</p>
                    <p className="hover:border-b-2 hover:border-blue-500 cursor-pointer" onClick={cancleDisplayArsip}>Cancel Display</p>
                </div>
            <AiFillSetting className=" w-7 h-7 text-gray-800 cursor-pointer animate-spin"/>
        </div>
        <Reading readItem={readItem}  CloseRead={closeRead}/>
        <div className={`flex gap-2 ${readItem?"blur-md":""} transition-all duration-500 ease-in-out`}>
        <LeftBar ref={firstActive} onSubmit={handleForm} erorTitle={erorTitle} editItem={editItem}></LeftBar>
        <div className="py-5 pr-5 flex flex-col justify-center gap-3 w-full">
            {content.length>0||arsip.length>0?
                <>
                <div className="w-full relative">
                <input type="text" ref={actived} onChange={searchNote} placeholder="Search Note" className="w-full px-10 py-3 shadow-lg rounded-sm outline-none focus:border-b-2 focus:border-blue-500" />
                    <AiOutlineSearch className="absolute left-2 top-3 w-7 h-7 opacity-30 cursor-pointer" onClick={activeInput}/>
                </div>
                <div className={`grid ${content.length>4?"lg:grid-cols-3" : "lg:grid-cols-2"} gap-5 max-h-[85vh] ${content.length>2?"overflow-y-scroll":""} max-w-full flex-1 px-5`}>
                {searchItem.length==0&&allData.length==0&&searchDisplay===false?
                            activeArsip?
                                arsip.map((item)=>{
                                    return(
                                        <div className={`relative shadow-xl py-5 px-2 rounded ${colorEdit&&item.id===editItem.id ? "bg-blue-500":"bg-red-500"} min-h-[250px]`} key={item.id}>
                                            <p className="absolute top-1 left-2 text-sm opacity-80 text-white capitalize w-21">edit : {item.createdAt}</p>
                                            <p className="absolute top-1 right-6 text-sm opacity-80 text-green-400">{item.archived?"arsip":""}</p>
                                            <div className="absolute bottom-1 left-0 flex flex-col items-center group" onClick={()=>editArsip(item.id)}>
                                                <p className="bg-gray-800 px-3 py-0.5 rounded-full text-white capitalize scale-0 group-hover:scale-100 transition-all duration-500">Edit</p>
                                                <AiFillEdit className=" w-7 h-7 text-blue-800 cursor-pointer"/>
                                            </div>
                                            <div className="absolute top-[-30px] right-[-10px] flex flex-col items-center group z-20" >
                                                <div className="bg-gray-800 px-3 py-1 w-[100px] rounded-lg text-white capitalize scale-0 group-hover:scale-100 transition-all duration-500">
                                                    <p className="hover:border-b-2 hover:border-blue-500 cursor-pointer" onClick={()=>handleArsip(item.id)}>Arsip</p>
                                                    <p className="hover:border-b-2 hover:border-blue-500 cursor-pointer" onClick={()=>handleCancleArsip(item.id)}>Cancel</p>
                                                </div>
                                                <AiOutlineMore className=" w-7 h-7 text-gray-800 cursor-pointer"/>
                                            </div>
                                            <h1 className="capitalize text-lg text-center text-white">{item.tittle}</h1>
                                            <p className="first-letter:font-bold first-letter:text-lg first-letter:uppercase text-justify text-white">{item.body.substring(0,200)}......</p>
                                            <div className="absolute bottom-1 left-[49%] transform translate-x-[-60%] flex flex-col items-center group" onClick={()=>readArsip(item.id)}>
                                                <p className="bg-gray-800 px-3 py-0.5 rounded-full text-white capitalize scale-0 group-hover:scale-100 transition-all duration-500">Read</p>
                                                <AiFillRead className=" w-7 h-7 text-brown-800 cursor-pointer"/>
                                            </div>
                                            <div className="absolute bottom-1 right-0 flex flex-col items-center group" onClick={()=>deleteArsip(item.id)}>
                                                <p className="bg-gray-800 px-3 py-0.5 rounded-full text-white capitalize scale-0 group-hover:scale-100 transition-all duration-500">delete</p>
                                                <AiFillDelete className=" w-7 h-7 text-red-800 cursor-pointer"/>
                                            </div>
                                        </div>
                                  )
                                })
                                :
                                content.map((item)=>{
                                return(
                                    <div className={`relative shadow-xl py-5 px-2 rounded ${colorEdit&&item.id===editItem.id?"bg-green-500 text-white":"bg-gray-300"} min-h-[250px]`} key={item.id}>
                                        <p className="absolute top-1 left-2 text-sm opacity-80 text-slate-50 capitalize w-21">edit : {item.createdAt}</p>
                                        <p className="absolute top-1 right-6 text-sm opacity-80 text-green-500">{item.archived?"arsip":""}</p>
                                        <div className="absolute bottom-1 left-0 flex flex-col items-center group" onClick={()=>handleEditItem(item.id)}>
                                            <p className="bg-gray-800 px-3 py-0.5 rounded-full text-white capitalize scale-0 group-hover:scale-100 transition-all duration-500">Edit</p>
                                            <AiFillEdit className=" w-7 h-7 text-blue-800 cursor-pointer"/>
                                        </div>
                                        <div className="absolute top-[-30px] right-[-10px] flex flex-col items-center group z-20" >
                                            <div className="bg-gray-800 px-3 py-1 w-[100px] rounded-lg text-white capitalize scale-0 group-hover:scale-100 transition-all duration-500">
                                                <p className="hover:border-b-2 hover:border-blue-500 cursor-pointer" onClick={()=>handleArsip(item.id)}>Arsip</p>
                                                <p className="hover:border-b-2 hover:border-blue-500 cursor-pointer" onClick={()=>handleCancleArsip(item.id)}>Cancel</p>
                                            </div>
                                            <AiOutlineMore className=" w-7 h-7 text-gray-800 cursor-pointer"/>
                                        </div>
                                        <h1 className="capitalize text-lg text-center">{item.tittle}</h1>
                                        <p className="first-letter:font-bold first-letter:text-lg first-letter:uppercase text-justify">{item.body.substring(0,400)}......</p>
                                        <div className="absolute bottom-1 left-[49%] transform translate-x-[-60%] flex flex-col items-center group" onClick={()=>handleRead(item.id)}>
                                            <p className="bg-gray-800 px-3 py-0.5 rounded-full text-white capitalize scale-0 group-hover:scale-100 transition-all duration-500">Read</p>
                                            <AiFillRead className=" w-7 h-7 text-brown-800 cursor-pointer"/>
                                        </div>
                                        <div className="absolute bottom-1 right-0 flex flex-col items-center group" onClick={()=>deleteNote(item.id)}>
                                            <p className="bg-gray-800 px-3 py-0.5 rounded-full text-white capitalize scale-0 group-hover:scale-100 transition-all duration-500">delete</p>
                                            <AiFillDelete className=" w-7 h-7 text-red-800 cursor-pointer"/>
                                        </div>
                                    </div>
                                  )
                                })
                            :
                            searchItem.map((item)=>{
                                return(
                                    <div className={`relative shadow-xl py-5 px-2 rounded ${item.archived?"bg-red-500":"bg-gray-200"} min-h-[250px]`} key={item.id}>
                                        <p className="absolute top-1 left-2 text-sm opacity-80 text-gray-400 capitalize w-21">edit : {item.createdAt}</p>
                                        <p className="absolute top-1 right-6 text-sm opacity-80 text-green-500">{item.archived?"arsip":""}</p>
                                        <div className="absolute bottom-1 left-0 flex flex-col items-center group" onClick={item.archived?()=>editArsip(item.id):()=>handleEditItem(item.id)}>
                                            <p className="bg-gray-800 px-3 py-0.5 rounded-full text-white capitalize scale-0 group-hover:scale-100 transition-all duration-500">Edit</p>
                                            <AiFillEdit className=" w-7 h-7 text-blue-800 cursor-pointer"/>
                                        </div>
                                        <div className="absolute top-[-30px] right-[-10px] flex flex-col items-center group z-20" >
                                            <div className="bg-gray-800 px-3 py-1 w-[100px] rounded-lg text-white capitalize scale-0 group-hover:scale-100 transition-all duration-500">
                                                <p className="hover:border-b-2 hover:border-blue-500 cursor-pointer" onClick={()=>handleArsip(item.id)}>Arsip</p>
                                                <p className="hover:border-b-2 hover:border-blue-500 cursor-pointer" onClick={()=>handleCancleArsip(item.id)}>Cancel</p>
                                            </div>
                                            <AiOutlineMore className=" w-7 h-7 text-gray-800 cursor-pointer"/>
                                        </div>
                                        <h1 className={`capitalize text-lg text-center ${item.archived?"text-white":""}`}>{item.tittle}</h1>
                                        <p className={`first-letter:font-bold first-letter:text-lg first-letter:uppercase text-justify ${item.archived?"text-white":""}`}>{item.body.substring(0,400)}......</p>
                                        <div className="absolute bottom-1 left-[49%] transform translate-x-[-60%] flex flex-col items-center group" onClick={item.archived?()=>readArsip(item.id):()=>handleRead(item.id)}>
                                            <p className="bg-gray-800 px-3 py-0.5 rounded-full text-white capitalize scale-0 group-hover:scale-100 transition-all duration-500">Read</p>
                                            <AiFillRead className=" w-7 h-7 text-brown-800 cursor-pointer"/>
                                        </div>
                                        <div className="absolute bottom-1 right-0 flex flex-col items-center group" onClick={item.archived?()=>deleteArsip(item.id):()=>deleteNote(item.id)}>
                                            <p className="bg-gray-800 px-3 py-0.5 rounded-full text-white capitalize scale-0 group-hover:scale-100 transition-all duration-500">delete</p>
                                            <AiFillDelete className=" w-7 h-7 text-red-800 cursor-pointer"/>
                                        </div>
                                </div>
                                )
                            })
                        }
                </div>
                </>
                :
                <h1 className="text-7xl opacity-10">No Note in Directory</h1>
            }
        </div>
        </div>
    </div>
  )
}


export default NoteApp;