import React from 'react'
import Main from './main'
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom"
import './styles.css'

const App: React.FC = () => {
    return (
        <div className='app'>
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route path={'/'}>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </div>
    )
}

export default App