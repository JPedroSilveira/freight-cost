import React, { useState, useEffect } from 'react'
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
import Loader from '../components/loader'

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            const success = await DataService.verifyUpdates()
            if (!success) {
                toast.error(AppConstants.ERROR_LOADING_DATA)
            } else {
                endLoading()
            }
        }

        let endLoading = () => {
            setIsLoading(false)
        }

        loadData()
        return () => {
            endLoading = () => {}
        }
    }, [])

    return (
        <div className='app'>
            <Loader isLoading={isLoading}>
                <Switch>
                    <Route exact path="/">
                        {!isLoading && <Main />}
                    </Route>
                    <Route path={'/'}>
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </Loader>
        </div>
    )
}

export default App