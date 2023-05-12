import { render, act, fireEvent , screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import LoginBooking from "../components/Auth/LoginBooking"

import {MemoryRouter} from "react-router-dom";


test('Renderizado correcto', () => {
    render( <LoginBooking />, { wrapper: MemoryRouter })
    const elemento = screen.queryByText("Para realizar una reserva necesitas estar logueado");
    expect(elemento).toBeInTheDocument();
    
})