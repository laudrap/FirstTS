import { Auth0Provider } from '@auth0/auth0-react'
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components'
import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from "./Main2"
import "./index.css"


/**
 * Returns the domain value given by Auth0 or an empty string
 */
const domain = import.meta.env.VITE_AUTH0_DOMAIN ?? "";

/**
 * Returns the clienID value given by Auth0 or an empty string
 */
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID ?? "";


/**
 * Renders the Main function from Main2.tsx file & implement OAuth  (est-ce que c'est la bonne affaire?)
 */

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FluentProvider theme={teamsLightTheme}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <Main />
      </Auth0Provider>
    </FluentProvider>
  </React.StrictMode>,
)

