import Header from '../components/header'
import {render, screen} from '@testing-library/react'

//Step one, wrap everything within a test suite
xdescribe('Header', () => {
  test('Should Display App Name', () => {
    render(<Header/>)
    expect(screen.getByText('Whats 4 Dinner')).toBeInTheDocument()
  })
})