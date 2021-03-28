import { render, screen, fireEvent, act } from '@testing-library/react'
import Button from '../../components/button'

test('button with valid text', async () => {
    render(<Button onClick={() => {}}>Button text test</Button>)

    const button = screen.getByText('Button text test') as HTMLButtonElement

    expect(button).toBeInTheDocument()
})

test('button click', async () => {
    let clicked = false

    const handleClick = () => {
        clicked = true
    }
    render(<Button onClick={handleClick}>teste</Button>)

    const button = screen.getByText('teste') as HTMLButtonElement

    fireEvent.click(button)

    expect(clicked).toBe(true)
})

test('button empty child', async () => {
    let clicked = false

    const handleClick = () => {
        clicked = true
    }
    render(<Button onClick={handleClick}></Button>)

    const button = document.getElementsByClassName('button')[0] as HTMLButtonElement
    
    fireEvent.click(button)

    expect(clicked).toBe(true)
})