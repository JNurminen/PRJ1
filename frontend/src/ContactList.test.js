import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
//import userEvent from '@testing-library/user-event'
import ContactList from './ContactList'

// Testataan, että yhteystiedot renderöidään
test('renders a list of contacts', () => {
    const contacts = [
        { id: 1, name: 'John Doe', email: 'John.Doe@gmail.com', phone: '0413125678' }
    ]
    render(<ContactList contacts={contacts} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('John.Doe@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('0413125678')).toBeInTheDocument()
})