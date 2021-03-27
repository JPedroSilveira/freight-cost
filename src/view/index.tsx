import React from 'react'
import Main from './main'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom"
import './styles.css'

const App: React.FC = () => {
    return (
        <div className='app'>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>
                    <Route path={'/'}>
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App