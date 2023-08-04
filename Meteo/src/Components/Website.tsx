
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

/**
 * Renders the profile component with user information.
 * @returns {JSX.Element|null} The rendered profile component if authenticated, otherwise null.
 */

interface UserProfile { name: string; theme: string }

const Profil = () => {
    console.log("hello")

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState<UserProfile | null>(null);

    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "dev-o4cbj1cg6lenlfwv.us.auth0.com";

            try {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: `https://${domain}/api/v2/`,
                        scope: "read:current_user",
                    },
                });

                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const { user_metadata } = await metadataResponse.json();

                setUserMetadata(user_metadata);
            } catch (e: any) {
                console.log(e.message);
            }
        };

        isAuthenticated && getUserMetadata();
    }, [isAuthenticated, user?.sub]);

    if (!isAuthenticated) {
        return (<div className='need'>
            <div className="boneed" >
                <h1 className="police">You need to sign In!</h1>
            </div>
        </div>);
    }


    return (
        isAuthenticated && (
            <div className='wrap'>
                <div className="boxtxt" >
                    {userMetadata ? (
                        <h1 className="police">Welcome {userMetadata?.name} !</h1>
                    ) : (
                        <h1 className="police">Welcome, you've signed in!</h1>
                    )}
                </div>
            </div>
        )

    )


}

export default Profil
