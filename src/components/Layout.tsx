import { Route, Routes } from 'react-router-dom'
import Sidebar from "./Sidebar"
import Main from './Main'

const Layout = () => { 

    return (
        <>
         <Sidebar/> 
         <Main/>
        </>
    )
}


export default Layout