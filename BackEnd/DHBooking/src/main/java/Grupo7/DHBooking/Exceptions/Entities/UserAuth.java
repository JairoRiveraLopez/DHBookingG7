package Grupo7.DHBooking.Exceptions.Entities;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class UserAuth {

    private Long idUser;

    private String name;

    private String lastName;

    private String email;

    private Role role;

    private String token;

    private List<Booking> bookingList;

}
