
import { useAuth0 } from "@auth0/auth0-react";



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
