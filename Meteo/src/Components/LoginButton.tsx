import { useAuth0 } from '@auth0/auth0-react'



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