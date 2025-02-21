import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from './ContactForm';

test('updates contact form', () => {
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/Name:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const phoneInput = screen.getByLabelText(/Phone:/i);
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'John.Doe@testi.com' } });
    fireEvent.change(phoneInput, { target: { value: '0413125678' } });
    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('John.Doe@testi.com');
    expect(phoneInput.value).toBe('0413125678');
});