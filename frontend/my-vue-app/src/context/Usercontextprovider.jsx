
import React,{ useState } from "react"
import Usercontext from "./Usercontext"

const Usercontextprovider= ({children})=>{
    const [cartaddhandlesidebar,setcartaddhandlesidebar]=useState(false)
    const [currentproductquickview,setcurrentproductquickview]=useState()
    const [couponappliedfordiscount,setcouponappliedfordiscount]=useState(false)
    return (
        <Usercontext.Provider value={{cartaddhandlesidebar,setcartaddhandlesidebar,currentproductquickview,setcurrentproductquickview,couponappliedfordiscount,setcouponappliedfordiscount}}>
            {children}
        </Usercontext.Provider>
    )
}

export default Usercontextprovider