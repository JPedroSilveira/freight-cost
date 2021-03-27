import { render, screen } from '@testing-library/react'
import Header from '../../components/header'
import AppConstants from '../../constants/AppConstants'

test('title is present on header', () => {
    render(<Header />)
    const regex = new RegExp(AppConstants.APP_NAME, 'i')
    const titleElement = screen.getByText(regex)
	expect(titleElement).toBeInTheDocument()
})

test('logo alt is present on header', () => {
    render(<Header />)
    const logoElement = screen.getByAltText(AppConstants.LOGO_ALT)
    expect(logoElement).toBeInTheDocument()
})