import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Footer from "../components/Layout/Footer";

test('Footer renderiza correctamente', () => {
  const view = render(<Footer />);
  expect(view.container).toBeInTheDocument();
});

test('texto correcto del Footer', () => {
  render(<Footer />)
  const elemento = screen.queryByText("©2021 Digital Booking");
  expect(elemento).toBeInTheDocument();
})

test('render correcto de imagenes de redes sociales', () => {
  render(
    <Footer />
  )
  const imgFB = screen.getByAltText("facebook")
  const imgTW = screen.getByAltText("tweeter")
  const imgIG = screen.getByAltText("instagram")
  const imgLK = screen.getByAltText("linkedin")

  expect(imgFB.alt).toBe("facebook")
  expect(imgTW.alt).toBe("tweeter")
  expect(imgLK.alt).toBe("linkedin")
  expect(imgIG.alt).toBe("instagram")

})
