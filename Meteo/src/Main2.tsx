
import App from './App'
import Loginb from './Components/LoginButton'
import Logoutb from './Components/LogoutButton'
import Slide from './Components/Slide'
import Profil from './Components/Website'
import "./index.css"



/**
 * Displays the right order in which components will be render on the HTML webpage.
 * @returns {JSX.Element} The rendered HTML webpage.
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
