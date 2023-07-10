
import App from './App'
import Loginb from './Components/LoginButton'
import Logoutb from './Components/LogoutButton'
import Slide from './Components/Slide'
import Profil from './Components/Website'
import "./index.css"
import React, { useEffect, useState } from 'react'



const Main = () => {

    return (
        <div className='main'>
            <Slide />
            <div className="btn">
                <Loginb />
                <Logoutb />
            </div>
            <Profil />
            <App />
        </div>
    )
}

export default Main

//    return (
 ///   <div className='main'>
 //       <Slide />
   //     <Loginb />
   //     <Logoutb />
   //     <App />
   // </div>
//)