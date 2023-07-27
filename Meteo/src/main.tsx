import { Auth0Provider } from '@auth0/auth0-react'
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components'
import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from "./Main2"
import "./index.css"


/**
 * The Auth0 domain value fetched from Vite environment variables or an empty string if not found.
 */
const domain = import.meta.env.VITE_AUTH0_DOMAIN ?? "";

/**
 * The Auth0 clientID value fetched from Vite environment variables or an empty string if not found.
 */
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID ?? "";


/**
 * Renders the Main component from Main2.tsx file and implements OAuth with Auth0.
 * @returns {void}
 */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FluentProvider theme={teamsLightTheme}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://dev-o4cbj1cg6lenlfwv.us.auth0.com/api/v2/",
          scope: "read:current_user update:current_user_metadata"
        }}
      >
        <Main />
      </Auth0Provider>
    </FluentProvider>
  </React.StrictMode>,
)

