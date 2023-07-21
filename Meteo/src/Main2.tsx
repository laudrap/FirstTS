
import App from './App'
import Loginb from './Components/LoginButton'
import Logoutb from './Components/LogoutButton'
import Slide from './Components/Slide'
import Profil from './Components/Website'
import "./index.css"



/**
 * Renders an HTML webpage with a carousel in the background, login/logout buttons,
 * a profile section if the user is authenticated, and the main application component.
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
