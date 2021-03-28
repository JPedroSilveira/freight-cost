import React from 'react'
import ReactDOM from 'react-dom'
import ServiceWorkerRegister from './service_worker/ServiceWorkerRegister'
import App from './app'
import isMobile from 'is-mobile'
import {  BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import './var.css'

const mobile = isMobile()
const body = document.getElementById('body')

if (body) {
  if (mobile) {
    body.setAttribute('data-device', 'mobile')
    body.setAttribute('class', 'mobile')
  } else {
    body.setAttribute('class', 'desktop')
  }
}

ReactDOM.render(
  <Router>
    <App/>
    <ToastContainer
      position={mobile ? "bottom-center" : "top-right"}
      autoClose={mobile? 1500 : 2500}
      newestOnTop={mobile ? true : false}
      hideProgressBar={true}
      closeOnClick
      pauseOnHover
    />
  </Router>,
  document.getElementById('root')
)

ServiceWorkerRegister.unregister()
