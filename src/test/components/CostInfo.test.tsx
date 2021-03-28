import { render, screen } from '@testing-library/react'
import CostInfo from '../../components/cost/cost_info'
import CostConstants from '../../constants/CostConstants'
import { CostService } from '../../services/'
import Cost from '../../types/Cost'
import StringUtils from '../../utils/StringUtils'

jest.mock('../../services/CostService.ts')

test('default text is present', async () => {
    render(<CostInfo/>)
    const regex = new RegExp(CostConstants.COST_INFO_TEXT, 'i')
    const element = screen.getByText(regex)
	expect(element).toBeInTheDocument()
})

test('default button is present', () => {
    render(<CostInfo/>)
    const element = screen.getByText(CostConstants.COST_BUTTON_TEXT)
	expect(element).toBeInTheDocument()
})

test('default button is present', async () => {
    render(<CostInfo/>)
    const fakeCost = (await CostService.get()) as Cost
    const stringPrice = StringUtils.numberToMoneyString(fakeCost.value)
    const element = screen.getByText(stringPrice)
	expect(element).toBeInTheDocument()
})
