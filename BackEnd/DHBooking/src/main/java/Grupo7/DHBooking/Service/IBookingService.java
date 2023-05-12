package Grupo7.DHBooking.Service;

import Grupo7.DHBooking.Exceptions.Entities.Booking;
import Grupo7.DHBooking.Exceptions.Entities.Product;

import java.text.ParseException;
import java.util.List;

public interface IBookingService {
    Booking createBooking(Booking booking);
    Booking getBookingById(Long idBooking);
    Booking updateBooking(Booking booking);
    void deleteBooking(Long idBooking);
    List<Booking> getAll();
    List<Product> getListOfProductsBetweenDatesAndCity(String startDate, String endDate, Long cityId) throws ParseException;
    Boolean availableProduct(String startDate, String endDate, Long productId) throws ParseException;
    List<Booking> getBookingsByProductId(Long idProduct);
    List<Booking> getBookingsByUserId(Long idUser);




}
