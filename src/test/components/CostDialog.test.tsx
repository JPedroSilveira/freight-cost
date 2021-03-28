import { render, screen, fireEvent, act } from '@testing-library/react'
import CostDialog from '../../components/cost/cost_dialog'
import CostConstants from '../../constants/CostConstants'
import { CostService } from '../../services'
import Cost from '../../types/Cost'
import SleepUtils from '../../utils/SleepUtils'

jest.mock('../../storage/Database.ts')

test('default label is present', async () => {
    render(<CostDialog open={true} onClose={() => { }} />)

    const element = screen.getByLabelText(CostConstants.UPDATE_COST_LABEL_TEXT)
    expect(element).toBeInTheDocument()
})

test('default title is present', async () => {
    render(<CostDialog open={true} onClose={() => { }} />)

    const element = screen.getByText(CostConstants.UPDATE_COST_DIALOG_TITLE)
    expect(element).toBeInTheDocument()
})

test('default buttons are present', async () => {
    render(<CostDialog open={true} onClose={() => { }} />)
    const b1 = screen.getByText(CostConstants.CANCEL_BUTTON_TEXT)
    const b2 = screen.getByText(CostConstants.SAVE_BUTTON_TEXT)

    expect(b1).toBeInTheDocument()
    expect(b2).toBeInTheDocument()
})

test('start with valid value', async () => {
    const cost: Cost = {
        value: 6.76
    }

    render(<CostDialog cost={cost} open={true} onClose={() => { }} />)

    const element = screen.getByRole('textbox') as HTMLInputElement

    expect(element.value).toBe('6.76')
})

test('start with negative value', async () => {
    const cost: Cost = {
        value: -6.76
    }

    render(<CostDialog cost={cost} open={true} onClose={() => { }} />)

    const element = screen.getByRole('textbox') as HTMLInputElement

    expect(element.value).toBe('0.00')
})

test('start with too long value', async () => {
    const cost: Cost = {
        value: 645645896.76
    }

    render(<CostDialog cost={cost} open={true} onClose={() => { }} />)

    const element = screen.getByRole('textbox') as HTMLInputElement

    expect(element.value).toBe('64564589.67')
})

test('enter too long value', async () => {
    const cost: Cost = {
        value: 0.00
    }

    render(<CostDialog cost={cost} open={true} onClose={() => { }} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    
    fireEvent.change(input, { target: { value: '645645896.76' } })

    expect(input.value).toBe('64564589.67')
})

test('enter value with special characters', async () => {
    const cost: Cost = {
        value: 0.00
    }

    render(<CostDialog cost={cost} open={true} onClose={() => { }} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    
    fireEvent.change(input, { target: { value: '96.76^~ ~~.' } })

    expect(input.value).toBe('96.76')
})

test('enter value with multiple dots', async () => {
    const cost: Cost = {
        value: 0.00
    }

    render(<CostDialog cost={cost} open={true} onClose={() => { }} />)

    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: '9..556.6.76.' } })

    expect(input.value).toBe('95566.76')
})

test('enter value with letters', async () => {
    const cost: Cost = {
        value: 0.00
    }

    render(<CostDialog cost={cost} open={true} onClose={() => { }} />)

    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: '9eas5ea.76' } })

    expect(input.value).toBe('95.76')
})

test('enter value without dot', async () => {
    const cost: Cost = {
        value: 0.00
    }

    render(<CostDialog cost={cost} open={true} onClose={() => { }} />)

    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: '1214' } })

    expect(input.value).toBe('12.14')
})

test('enter empty value', async () => {
    const cost: Cost = {
        value: 0.00
    }

    render(<CostDialog cost={cost} open={true} onClose={() => { }} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    
    fireEvent.change(input, { target: { value: '' } })

    expect(input.value).toBe('0.00')
})

test('enter too big value', async () => {
    const cost: Cost = {
        value: 0.00
    }
     
    render(<CostDialog cost={cost} open={true} onClose={() => { }} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    
    fireEvent.change(input, { target: { value: '01234567890123456789' } })

    expect(input.value).toBe('1234567.89')
})

test('enter zeros on left', async () => {
    const cost: Cost = {
        value: 0.00
    }

    render(<CostDialog cost={cost} open={true} onClose={() => { }} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    
    fireEvent.change(input, { target: { value: '00001.12' } })

    expect(input.value).toBe('1.12')
})

test('enter zeros on right', async () => {
    const cost: Cost = {
        value: 0.00
    }

    render(<CostDialog cost={cost} open={true} onClose={() => { }} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    
    fireEvent.change(input, { target: { value: '1.12000000' } })

    expect(input.value).toBe('1120000.00')
})

test('enter zeros on right and left', async () => {
    const cost: Cost = {
        value: 0.00
    }

    render(<CostDialog cost={cost} open={true} onClose={() => { }} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    
    fireEvent.change(input, { target: { value: '00001.12000000' } })

    expect(input.value).toBe('1120.00')
})

test('decimals with one zero', async () => {
    const cost: Cost = {
        value: 0.00
    }
        
    render(<CostDialog cost={cost} open={true} onClose={() => { }} />)

    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: '1.10' } })

    expect(input.value).toBe('1.10')
})

test('cancel button dispare function', async () => {
    const cost: Cost = {
        value: 0.00
    }

    let closed = false

    const handleClose = () => {
        closed = true
    }

    render(<CostDialog cost={cost} open={true} onClose={handleClose} />)

    const button = screen.getByText(CostConstants.CANCEL_BUTTON_TEXT) as HTMLButtonElement

    fireEvent.click(button)

    expect(closed).toBe(true)
})

test('save button add new cost', async () => {
    const cost: Cost = {
        value: 0.00
    }
        
    render(<CostDialog cost={cost} open={true} onClose={() => { }} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    const button = screen.getByText(CostConstants.SAVE_BUTTON_TEXT) as HTMLButtonElement

    fireEvent.change(input, { target: { value: '1.10' } })
    await SleepUtils.inSec(1)
    fireEvent.click(button)
    await SleepUtils.inSec(1)

    expect(input.value).toBe('1.10')

    const newCost = await CostService.get() as Cost

    expect(newCost.value).toBe(1.1)
})