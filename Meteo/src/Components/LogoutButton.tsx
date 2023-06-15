import { useAuth0 } from '@auth0/auth0-react'


const Logoutb = (): JSX.Element | null => {
    const { logout, isAuthenticated } = useAuth0();

    if (!isAuthenticated) {
        return null; // Return null when user is authenticated
    }

    return (
        isAuthenticated && (
            <button onClick={() => logout()} className="btnpropri">
                Sign Out
            </button>
        )

    )


}

export default Logoutb