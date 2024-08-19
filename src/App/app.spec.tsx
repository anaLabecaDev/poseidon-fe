import { PublicClientApplication } from '@azure/msal-browser'
import { render, screen } from '@testing-library/react'
import { App } from '@/App/app'

const mockMsalInstance = {
  // Add mock implementation here if needed
} as PublicClientApplication

describe('App', () => {
  test.skip('should return the correct text', () => {
    render(<App msPublicClientApp={mockMsalInstance} />)

    expect(screen.getByText('Vite + React/TS = EruptionJS')).toBeInTheDocument()
  })

  // test('should return 1 when the user click one time at button', () => {
  //   render(<App msPublicClientApp={mockMsalInstance} />)

  //   const buttonElement = screen.getByRole('button')
  //   expect(screen.queryByText('count is 0')).toBeInTheDocument()

  //   userEvent.click(buttonElement)

  //   waitFor(() => expect(screen.queryByText('count is 1')).toBeInTheDocument())
  // })
})
