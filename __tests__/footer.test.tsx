import Footer from '../components/footer'
import {render, screen} from '@testing-library/react'

//Step one, wrap everything within a test suite
xdescribe('Footer', () => {
  test('Should say "This is a Footer"', () => {
    render(<Footer/>)
    expect(screen.getByText('This is a Footer')).toBeInTheDocument()
  })
})