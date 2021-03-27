import React from 'react'
import ReactDOM from 'react-dom'
import ServiceWorkerRegister from './service_worker/ServiceWorkerRegister'
import App from './app'
import isMobile from 'is-mobile'
import {  BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import './var.css'

if (isMobile()) {
  const body = document.getElementById('body')
  if (body) {
    body.setAttribute('data-device', 'mobile')
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

ServiceWorkerRegister.unregister()
