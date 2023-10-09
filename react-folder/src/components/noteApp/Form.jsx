import {forwardRef} from 'react'
import { useRef, useEffect , useState} from 'react'
const LeftBar=forwardRef((props,ref)=>{
    const {onSubmit,erorTitle,editItem}=props
    const [disabled,setDisabled]=useState(false)
    const inputRef=useRef()
    const contentRef=useRef()
    useEffect(()=>{
        inputRef.current.focus()
    },[])


    if(editItem.tittle){
      inputRef.current.value=editItem.tittle
      contentRef.current.value=editItem.body
    }
    return(
       <div className="w-full max-w-sm max-h-screen">
            <form
            onSubmit={onSubmit}
            className="flex flex-col gap-2 px-2 py-5 w-full"
            >
                <input
                type="text" 
                name="tittle" 
                placeholder="Tittle" 
                className="px-3 py-2 shadow-2xl border-2 w-full max-w-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                ref={inputRef}
                disabled={disabled}
                />
            <p className={`text-red-500 text-center text-lg ${erorTitle?"block":"hidden"}`}>{erorTitle}</p>
                <textarea
                name="content" 
                placeholder="Typing..." 
                cols={30} 
                rows={erorTitle?17:19}
                ref={contentRef}
                className="px-3 resize-none py-2 shadow-lg border-2 w-full max-w-sm rounded-lg outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                <button type="submit" className="bg-orange-500 px-12 py-2 rounded-lg text-slate-50 hover:bg-red-800 transition-all duration-500 active:opacity-80">{editItem===""?"Save":"Update"}</button>
            </form> 
       </div>
    )
})

export default LeftBar