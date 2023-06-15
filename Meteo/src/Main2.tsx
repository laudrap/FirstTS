
import Slide from './Components/Slide'
import App from './App'
import Loginb from './Components/LoginButton'
import Logoutb from './Components/LogoutButton'
import { Log } from 'oidc-react'
import "./index.css"
import Profil from './Components/Website'


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