import { render, screen, fireEvent } from '@testing-library/react'
import PathSelector from '../../components/path/path_selector'
import CityConstants from '../../constants/CityConstants'
import City from '../../types/City'
import CityService from '../../services/CityService'
import SleepUtils from '../../utils/SleepUtils'
import Database from '../../storage/Database'

jest.mock('../../storage/Database.ts')

const cityService = new CityService(Database.city)

beforeEach((done) => {
    cityService.deleteAll().then(() => done())
})

test('title is present', () => {
    render(<PathSelector cityService={cityService} onCalcPath={() => {}} />)

    const element = screen.getByText(CityConstants.PATH_SELECTION_TITLE)
    expect(element).toBeInTheDocument()
})

test('button is present', () => {
    render(<PathSelector cityService={cityService} onCalcPath={() => {}} />)
    const regex = new RegExp(CityConstants.CALC_BUTTON_TEXT, 'gi')
    const element = screen.getByText(regex)
    expect(element).toBeInTheDocument()
})

test('enter value', () => {
    render(<PathSelector cityService={cityService} onCalcPath={() => {}} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    
    fireEvent.change(input, { target: { value: 'Aracaju' } })

    expect(input.value).toBe('Aracaju')
})

test('enter value with special characters', () => {
    render(<PathSelector cityService={cityService} onCalcPath={() => {}} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    
    fireEvent.change(input, { target: { value: 'Paraná' } })

    expect(input.value).toBe('Paraná')
})

test('test with unknown city', () => {
    render(<PathSelector cityService={cityService} onCalcPath={() => {}} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    
    fireEvent.change(input, { target: { value: 'unknown city' } })

    const element = screen.getByText(CityConstants.CITY_NOT_FOUND)

    expect(input.value).toBe('unknown city')
    expect(element).toBeInTheDocument()

})

test('show options', async () => {
    const cities: City[] = [
        {
            name: 'test 1'
        },
        {
            name: 'test 2'
        }
    ]

    await cityService.saveAll(cities)

    render(<PathSelector cityService={cityService} onCalcPath={() => {}} />)

    await SleepUtils.inSec(2)

    const input = screen.getByRole('textbox') as HTMLInputElement
    
    fireEvent.change(input, { target: { value: 'test' } })

    const test1 = screen.getByText('test 1') as HTMLInputElement

    expect(test1).toBeInTheDocument()

    const test2 = screen.getByText('test 2') as HTMLInputElement

    expect(test2).toBeInTheDocument()
})

test('add item with \',\' (test if value is remove from input)', async () => {
    const cities: City[] = [
        {
            name: 'test'
        },
        {
            name: 'test 2'
        }
    ]

    await cityService.saveAll(cities)

    render(<PathSelector cityService={cityService} onCalcPath={() => {}} />)

    await SleepUtils.inSec(2)

    const input = screen.getByRole('textbox') as HTMLInputElement
    
    fireEvent.change(input, { target: { value: 'test,' } })

    expect(input.value).toBe('')
})

test('click to select an option remove options list and add to input', async () => {
    const cities: City[] = [
        {
            name: 'test 1'
        },
        {
            name: 'test 2'
        }
    ]

    await cityService.saveAll(cities)

    const component = render(<PathSelector cityService={cityService} onCalcPath={() => {}} />)

    await SleepUtils.inSec(2)

    const input = screen.getByRole('textbox')
    
    fireEvent.change(input, { target: { value: 'test' } })

    const test1 = screen.getByText('test 1')

    expect(test1).toBeInTheDocument()

    const test2 = screen.getByText('test 2')

    expect(test2).toBeInTheDocument()

    fireEvent.click(test2)

    const selectedOption = screen.getByText('test 2')

    const listOfOptionsClose = component.queryAllByAltText('test 1').length === 0

    expect(listOfOptionsClose).toBe(true)

    expect(selectedOption).toBeInTheDocument()
})

test('test multiple selections', async () => {
    const cities: City[] = [
        {
            name: 'test 1'
        },
        {
            name: 'test 2'
        },
        {
            name: 'test 3'
        }
    ]

    await cityService.saveAll(cities)

    const component = render(<PathSelector cityService={cityService} onCalcPath={() => {}} />)

    await SleepUtils.inSec(2)

    const input = screen.getByRole('textbox')
    
    fireEvent.change(input, { target: { value: 'test' } })

    const test1 = screen.getByText('test 1')

    expect(test1).toBeInTheDocument()

    fireEvent.click(test1)

    fireEvent.change(input, { target: { value: 'test 2' } })

    const test2 = screen.getByText('test 2')

    expect(test2).toBeInTheDocument()

    fireEvent.click(test2)

    const selectedOption1 = screen.getByText('test 1')
    const selectedOption2 = screen.getByText('test 2')

    expect(selectedOption1).toBeInTheDocument()
    expect(selectedOption2).toBeInTheDocument()

    const listOfOptionsClose = component.queryAllByAltText('test 3').length === 0

    expect(listOfOptionsClose).toBe(true)
})

test('test multiple selections with \',\' (not close options list)', async () => {
    const cities: City[] = [
        {
            name: 'test 1'
        },
        {
            name: 'test 2'
        },
        {
            name: 'test 3'
        }
    ]

    await cityService.saveAll(cities)

    const component = render(<PathSelector cityService={cityService} onCalcPath={() => {}} />)

    await SleepUtils.inSec(2)

    const input = screen.getByRole('textbox')
    
    fireEvent.change(input, { target: { value: 'test 1,' } })

    fireEvent.change(input, { target: { value: 'test 2,' } })

    const test1Items = await screen.findAllByText('test 1')
    const test2Items = await screen.findAllByText('test 2')

    expect(test1Items.length).toBe(2)
    expect(test2Items.length).toBe(2)

    const listOfOptionsClose = component.queryAllByAltText('test 3').length === 0

    expect(listOfOptionsClose).toBe(true)
})

test('test multiple selections with \',\' and one with click (last one that closes options list)', async () => {
    const cities: City[] = [
        {
            name: 'test 1'
        },
        {
            name: 'test 2'
        },
        {
            name: 'test 3'
        },
        {
            name: 'test 4'
        }
    ]

    await cityService.saveAll(cities)

    const component = render(<PathSelector cityService={cityService} onCalcPath={() => {}} />)

    await SleepUtils.inSec(2)

    const input = screen.getByRole('textbox')
    
    fireEvent.change(input, { target: { value: 'test 1,' } })

    fireEvent.change(input, { target: { value: 'test 2,' } })

    fireEvent.change(input, { target: { value: 'test 3' } })

    const test3 = screen.getByText('test 3')

    expect(test3).toBeInTheDocument()

    fireEvent.click(test3)

    const test1Added = screen.getByText('test 1')
    const test2Added = screen.getByText('test 2')
    const test3Added = screen.getByText('test 3')

    expect(test1Added).toBeInTheDocument()
    expect(test2Added).toBeInTheDocument()
    expect(test3Added).toBeInTheDocument()

    const listOfOptionsClose = component.queryAllByAltText('test 4').length === 0

    expect(listOfOptionsClose).toBe(true)
})