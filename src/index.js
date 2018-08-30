import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import store from "./store/store"
import App from './App'
import BrowserDetection from 'react-browser-detection'
import registerServiceWorker from './registerServiceWorker'

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

const browserHandler = {
  chrome: () => app,
  safari: () => app,
  //firefox: () => app,
  //googlebot: () => <div>Hi GoogleBot!</div>,
  default: (browser) => <h1>Unfortunately {browser} is not fully supported. Please try Chrome for the best experience with this app.</h1>,
}

ReactDOM.render(
  <BrowserDetection>
    {browserHandler}
  </BrowserDetection>,
  document.getElementById("root")
)

registerServiceWorker()
