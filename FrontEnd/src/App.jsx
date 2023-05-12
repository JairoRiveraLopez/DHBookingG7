import React from "react";
import { Routes, Route } from "react-router-dom";
import { Auth } from "./utils/Auth";
import Main from "./components/Main";
import ProductDetail from "./components/ProductDetail";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Layout from './components/Layout'
import SuccessfulBooking from "./components/SuccessfulBooking";
import { AuthProvider } from "./context/AuthContext";
import Booking from "./components/Booking";
import {BookingProvider} from "./context/BookingContext";
import UserBookings from "./components/User/UserBookings";
import ProductCreate from "./components/Product/ProductCreate"

const App = () => {
  return (
    <div>
      <AuthProvider>
        <BookingProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/administrator" element={<ProductCreate />} />
            <Route path="/successful-booking" element={<SuccessfulBooking />} />
            <Route path="/product-detail/:productId" element={<ProductDetail />} />
            <Route path="/product-detail/:productId/bookings" element={<Booking />} />
            <Route path="/my-bookings" element={<UserBookings />} />
          </Routes>
        </Layout>
        </BookingProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
