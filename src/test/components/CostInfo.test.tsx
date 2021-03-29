import { render, screen } from '@testing-library/react'
import CostInfo from '../../components/cost/cost_info'
import CostConstants from '../../constants/CostConstants'

test('default text is present two times', async () => {
    render(<CostInfo/>)
    const regex = new RegExp(CostConstants.COST_INFO_TEXT, 'gi')
    const elements = await screen.findAllByText(regex)
	expect(elements.length).toBe(2)
})

test('default button is present', () => {
    render(<CostInfo/>)
    const element = screen.getByText(CostConstants.COST_BUTTON_TEXT)
	expect(element).toBeInTheDocument()
})