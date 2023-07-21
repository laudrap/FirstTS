
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Renders the profile component with user information.
 * @returns {JSX.Element|null} The rendered profile component if authenticated, otherwise null.
 */

const Profil = () => {
    const { user, isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        return null;
    }

    return (
        isAuthenticated && (
            <div className='wrap'>
                <div className="boxtxt" >
                    <h1 className="police">Welcome {user?.name} !</h1>
                </div>
            </div>
        )

    )


}

export default Profil
