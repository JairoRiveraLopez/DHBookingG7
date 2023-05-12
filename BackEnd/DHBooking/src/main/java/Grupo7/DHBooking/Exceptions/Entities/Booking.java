package Grupo7.DHBooking.Exceptions.Entities;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@Getter
@Setter
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_booking")
    private Long idBooking;

    @Column(name = "start_hour")
    private Integer startHour;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @JsonIncludeProperties(value = {"idProduct", "title", "images"})
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_product")
    private Product product;

    @JsonIncludeProperties(value = {"idUser", "name", "lastName"})
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user")
    private User user;


    public String toString()
    {
        return idBooking + " " + startHour + " " + startDate ;
    }
}
