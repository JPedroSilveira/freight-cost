import { render, screen } from '@testing-library/react'
import CostInfo from '../../components/cost/cost_info'
import CostConstants from '../../constants/CostConstants'

test('default text is present', async () => {
    render(<CostInfo/>)
    const element = screen.getByText(CostConstants.COST_INFO_TEXT)
	expect(element).toBeInTheDocument()
})

test('default button is present', () => {
    render(<CostInfo/>)
    const element = screen.getByText(CostConstants.COST_BUTTON_TEXT)
	expect(element).toBeInTheDocument()
})