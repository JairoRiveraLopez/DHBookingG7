package Grupo7.DHBooking.Repository;

import Grupo7.DHBooking.Exceptions.Entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBookingRepository extends JpaRepository<Booking, Long> {

    @Query(value = "select * from bookings where id_product = :productId order by start_date",
            nativeQuery = true)
    List<Booking> findBookingsByProductId (Long productId);

    @Query(value = "select * from bookings where id_user = :userId order by start_date",
            nativeQuery = true)
    List<Booking> findBookingsByUserId (Long userId);

}
