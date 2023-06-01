import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import app2 from './app2.0'
import 'bootstrap/dist/css/bootstrap.css'
import "./item.css"
import "./index.css"
import Main from "./Main2"
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components'
import Slide from './Components/Slide'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FluentProvider theme={teamsLightTheme}>
      <Main />
    </FluentProvider>
  </React.StrictMode>,
)
