import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import App from '../../app'
import AppConstants from '../../constants/AppConstants'

test('app with header', () => {
    const history = createMemoryHistory()
    history.push('/')
    render(
        <Router history={history}>
            <App />
        </Router>
    )

    const headerTitle = screen.getByText(AppConstants.APP_NAME)
    expect(headerTitle).toBeInTheDocument()
})

test('app redirecting not existent path to root', () => {
    const history = createMemoryHistory()
    history.push('/some/path/that/not/exists')
    render(
      <Router history={history}>
        <App />
      </Router>
    )

    const headerTitle = screen.getByText(AppConstants.APP_NAME)
    expect(headerTitle).toBeInTheDocument()
})