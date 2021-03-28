import React, { useEffect } from 'react'
import Main from './main'
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom"
import { DataService } from '../services/'
import { toast } from 'react-toastify'
import AppConstants from '../constants/AppConstants'
import './styles.css'

const App: React.FC = () => {
    useEffect(() => {
        const loadData = async () => {
            const success = DataService.verifyUpdates()
            if (!success) toast.error(AppConstants.ERROR_LOADING_DATA)
        }

        loadData()
    }, [])

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