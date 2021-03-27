import React from 'react'
import ReactDOM from 'react-dom'
import ServiceWorkerRegister from './service_worker/ServiceWorkerRegister'
import App from './view'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

ServiceWorkerRegister.unregister()
