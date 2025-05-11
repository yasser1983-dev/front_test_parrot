import { render, fireEvent, screen } from '@testing-library/react';
import OrderForm from "../OrderForm";

test('renders order form and submits', () => {
    render(<OrderForm />);
    const submitBtn = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitBtn);
    expect(screen.getByText(/order submitted/i)).toBeInTheDocument();
});
