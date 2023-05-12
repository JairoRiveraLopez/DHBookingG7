package Grupo7.DHBooking.Service.impl;

import Grupo7.DHBooking.Exceptions.Entities.Booking;
import Grupo7.DHBooking.Exceptions.Entities.Product;
import Grupo7.DHBooking.Repository.IBookingRepository;
import Grupo7.DHBooking.Service.IBookingService;
import Grupo7.DHBooking.Service.IProductService;
import Grupo7.DHBooking.Util.DateParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;



@Service
public class BookingServiceImpl implements IBookingService {
    @Autowired
    private IBookingRepository bookingRepository;

    @Autowired
    private IProductService productService;

    @Override
    public List<Booking> getAll() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getBookingById(Long idBooking) {
        return bookingRepository.findById(idBooking).get();
    }

    @Override
    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public Booking updateBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public void deleteBooking(Long idBooking) {
        bookingRepository.deleteById(idBooking);
    }

    @Override
    public Boolean availableProduct(String startDate, String endDate, Long productId) throws ParseException {

        List<Booking> listBookings;
        listBookings = productService.getProductById(productId).getBookingList();

        LocalDate formattedStartDate = DateParser.parseDateFormat(startDate);
        LocalDate formattedEndDate = DateParser.parseDateFormat(endDate);


        Boolean state = true;
        for (Booking booking : listBookings) {
            if (!validateDatesBetweenRange(formattedStartDate, formattedEndDate, booking.getStartDate(), booking.getEndDate())) {
                state = false;
                break;
            }
        }

        if (state) {
            return true;
        } else {
            return false;
        }


    }

    @Override
    public List<Product> getListOfProductsBetweenDatesAndCity(String startDate, String endDate, Long cityId) throws ParseException {
        List<Product> listProductsAvailable = new ArrayList<Product>();
        List<Product> listProduct;
        if(cityId!=null) {
            listProduct = productService.getByCity(cityId);
        }else{
            listProduct = productService.getAll();
        }

        LocalDate formattedStartDate = DateParser.parseDateFormat(startDate);
        LocalDate formattedEndDate = DateParser.parseDateFormat(endDate);

        if(cityId!=null){
            for (Product cityProduct : listProduct) {
                List<Booking> listBookingByProductId = bookingRepository.findBookingsByProductId(cityProduct.getIdProduct());
                Boolean state = true;
                for (Booking booking : listBookingByProductId) {
                    if (!validateDatesBetweenRange(formattedStartDate, formattedEndDate, booking.getStartDate(), booking.getEndDate())) {
                        state = false;
                        break;
                    }
                }
                if(state){
                    listProductsAvailable.add(cityProduct);
                }
            }
        }else{
            for (Product cityProduct : listProduct) {
                List<Booking> listBookingByProductId = bookingRepository.findBookingsByProductId(cityProduct.getIdProduct());
                Boolean state = true;
                for (Booking booking : listBookingByProductId) {
                    if (!validateDatesBetweenRange(formattedStartDate, formattedEndDate, booking.getStartDate(), booking.getEndDate())) {
                        state = false;
                        break;
                    }
                }
                if(state){
                    listProductsAvailable.add(cityProduct);
                }
            }
        }
        System.out.println(listProductsAvailable);
        return listProductsAvailable;
    }

    @Override
    public List getBookingsByProductId(Long idProduct) {
        List forbiddenDates = new ArrayList();
        List<Booking> productBookings = bookingRepository.findBookingsByProductId(idProduct);
        for(Booking booking: productBookings) {
            LocalDate startDate = booking.getStartDate();
            LocalDate endDate = booking.getEndDate().plusDays(1);
            List<LocalDate> listOfDates = startDate.datesUntil(endDate).collect(Collectors.toList());

            for(LocalDate forbiddenDate: listOfDates) {
                System.out.println(forbiddenDate);
                forbiddenDates.add( forbiddenDate );
            }
        }
        return (List) forbiddenDates.stream().distinct().collect(Collectors.toList());
    }


    public List<Booking> getBookingsByUserId(Long idUser) {
        List<Booking> userBookings = bookingRepository.findBookingsByUserId(idUser);
        return userBookings;
    }

    private Boolean validateDatesBetweenRange(LocalDate queryStartDate, LocalDate queryEndDate, LocalDate bddStartDate, LocalDate bddEndDate) {
        if (((queryStartDate.compareTo(bddStartDate) >= 0 && queryStartDate.compareTo(bddEndDate) <= 0)
                || (queryEndDate.compareTo(bddStartDate) >= 0 && queryEndDate.compareTo(bddEndDate) <= 0))) {
            return Boolean.FALSE;
        } else if (((bddStartDate.compareTo(queryStartDate) >= 0 && bddStartDate.compareTo(queryEndDate) <= 0)
                || (bddEndDate.compareTo(queryStartDate) >= 0 && bddEndDate.compareTo(queryEndDate) <= 0)))  {
                return Boolean.FALSE;
        } else {
            return Boolean.TRUE;
        }
    }
}
