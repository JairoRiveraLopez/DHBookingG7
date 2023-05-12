import SuccesfullBooking from "../components/SuccessfulBooking.jsx"
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";

test("Renderizado correcto de SuccesfullBooking", ()=>{
   render(<SuccesfullBooking/>,{ wrapper: MemoryRouter });
 
  
})

  test('Se renderiza el mensaje de exito', () => {
    render( <SuccesfullBooking />, { wrapper: MemoryRouter })
    const message = screen.getByText(/Su reserva se ha realizado con éxito/i);
    expect(message).toBeInTheDocument()
  })