import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import HourBooking  from '../components/booking/HourBooking';

test('Mensaje de horario', () => {
  render(<HourBooking />)
  const elemento = screen.queryByText("Tu habitación va a estar lista para el check-in entre las 10:00 AM y las 11:00 PM");
  
  expect(elemento).toBeInTheDocument();
})

