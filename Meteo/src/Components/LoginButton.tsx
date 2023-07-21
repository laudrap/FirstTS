import { useAuth0 } from '@auth0/auth0-react'


/**
 * Renders a login button if a user isn't authenticated via Auth0.
 * @returns {JSX.Element|null} The rendered login button element if not authenticated, otherwise null.
 */

const Loginb = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    if (isAuthenticated) {
        return null; // Return null when user is authenticated
    }

    return (
        !isAuthenticated && (
            <button onClick={() => loginWithRedirect()} className="btnpropri" >
                Sign In
            </button>
        )

    )


}

export default Loginb