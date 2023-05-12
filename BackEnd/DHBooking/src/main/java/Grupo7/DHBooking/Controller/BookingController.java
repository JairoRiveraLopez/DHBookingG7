package Grupo7.DHBooking.Controller;

import Grupo7.DHBooking.Exceptions.Entities.Booking;
import Grupo7.DHBooking.Exceptions.Entities.DTO.UserDTO;
import Grupo7.DHBooking.Exceptions.Entities.Product;
import Grupo7.DHBooking.Exceptions.Entities.User;
import Grupo7.DHBooking.Service.IBookingService;
import Grupo7.DHBooking.Service.IProductService;
import Grupo7.DHBooking.Service.IUserService;
import Grupo7.DHBooking.Util.DateParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/bookings")
public class BookingController {
    @Autowired
    private IBookingService bookingService;

    @Autowired
    private IProductService productService;

    @Autowired
    IUserService userService;

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings(){
        return new ResponseEntity<>(bookingService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id){
        Optional<Booking> bookingFound = Optional.ofNullable(bookingService.getBookingById(id));
        if(bookingFound.isPresent()) {
            return ResponseEntity.ok(bookingFound.get());
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/my-bookings/{idUser}")
    public ResponseEntity<List<Booking>> getBookingsByUserId(@PathVariable Long idUser){
        Optional<UserDTO> userFound = Optional.ofNullable(userService.readUser(idUser));
        System.out.println("Quiero obtener reservas por usuario");
        if(userFound.isPresent()) {
            System.out.println("idUser: " + idUser);
            return ResponseEntity.ok(bookingService.getBookingsByUserId(idUser));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/idProduct")
    public ResponseEntity<List> getAllBookingsByProduct(@RequestParam(required = false) Long idProduct) {
        System.out.println("Me estan pidiendo las reservas por id de producto");
        System.out.println(idProduct);
        Optional<Product> productFound = Optional.ofNullable(productService.getProductById(idProduct));
        if (productFound.isPresent()) {
            return ResponseEntity.ok(bookingService.getBookingsByProductId(idProduct));
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/listAvailableProducts")
    public ResponseEntity<List<Product>> listAvailableProducts(@RequestBody Map<String, String> json) throws ParseException {
        System.out.println(json);
        String cityId = json.get("cityId");
        System.out.println(cityId);
        Optional<List<Product>> listAvailableProducts;
        if (cityId!=null) {
            System.out.println("Estoy en endpoint listAvailableProducts con ciudad");
           listAvailableProducts = Optional.ofNullable(bookingService.getListOfProductsBetweenDatesAndCity(json.get("startDate"), json.get("endDate"), Long.valueOf(json.get("cityId"))));
        }else {
            System.out.println("Estoy en endpoint listAvailableProducts sin ciudad");
            listAvailableProducts = Optional.ofNullable(bookingService.getListOfProductsBetweenDatesAndCity(json.get("startDate"), json.get("endDate"), null));
        }

        //Optional<List<Product>> listAvailableProducts = Optional.ofNullable(bookingService.getListOfProductsBetweenDatesAndCity(json.get("startDate"), json.get("endDate"), Long.valueOf(json.get("cityId"))));
        if(listAvailableProducts.isPresent()){
            return ResponseEntity.ok(listAvailableProducts.get());
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody  Map<String, String> json) throws ParseException {

        System.out.println("Estoy queriendo almacenar una reserva");
        System.out.println(json);

        LocalDate startDate =  DateParser.parseDateFormat(json.get("startDate"));
        LocalDate endDate = DateParser.parseDateFormat(json.get("endDate"));
        Integer startHour = Integer.valueOf(json.get("startHour"));
        Long idProduct = Long.valueOf(json.get("idProduct"));
        Long idUser = Long.valueOf(json.get("idUser"));

        if (bookingService.availableProduct(json.get("startDate"), json.get("endDate"), idProduct  )){

            Booking booking = new Booking();
            booking.setStartHour(startHour);
            booking.setStartDate(startDate);
            booking.setEndDate(endDate);

            Product product = new Product();
            product.setIdProduct(idProduct);
            booking.setProduct(product);

            User user = new User();
            user.setIdUser(idUser);
            booking.setUser(user);

            return new ResponseEntity<>(bookingService.createBooking(booking), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @PutMapping
    public ResponseEntity<Booking> updateBooking(@RequestBody Booking booking){
        Optional<Booking> bookingToUpdate = Optional.ofNullable(bookingService.getBookingById(booking.getIdBooking()));
        if (bookingToUpdate.isPresent()){
            return ResponseEntity.ok(bookingService.updateBooking(booking));
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id){
        Optional<Booking> bookingQuery = Optional.ofNullable(bookingService.getBookingById(id));
        if (bookingQuery.isPresent()){
            bookingService.deleteBooking(id);
            return ResponseEntity.ok("La reserva con ID = " + id + " ha sido eliminada.");
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
