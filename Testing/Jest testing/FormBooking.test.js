import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { FormBooking } from '../components/booking/FormBooking';
import {MemoryRouter} from "react-router-dom"
import { mockComponent } from 'react-dom/test-utils';


mockComponent.jest("axios")
test("debe haber un form",()=>{
    render(<MemoryRouter><FormBooking/></MemoryRouter>)
  
});
  // test("correo electronico",()=>{
  //   render(<FormBooking/>, {wrapper:MemoryRouter})
    // const elemento = screen.queryByText("Correo Electronico");
    // expect(elemento).toBeInTheDocument();
  // })


 // const elemento = screen.queryByText("Completá tus datos");
    // expect(elemento).toBeInTheDocument();