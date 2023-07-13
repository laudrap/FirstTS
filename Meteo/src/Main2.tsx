
import App from './App'
import Loginb from './Components/LoginButton'
import Logoutb from './Components/LogoutButton'
import Slide from './Components/Slide'
import Profil from './Components/Website'
import "./index.css"



/**
 * Returns an HTML webpage
 * returns the carousel in the background, then the Login or Logout function, the Profil function if the user is authenticated and the App function. 
 */



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
