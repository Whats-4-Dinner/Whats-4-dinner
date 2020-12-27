import Index from '../pages/index'
import {render, screen} from '@testing-library/react'

//Step one, wrap everything within a test suite
describe('Inital', () => {
  test('Should Display App Name', () => {
    render(<Index/>)
    expect(screen.getByText('Whats 4 Dinner')).toBeInTheDocument()
  })
})