package Grupo7.DHBooking.Exceptions.Entities.DTO;

import Grupo7.DHBooking.Exceptions.Entities.Booking;
import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserAuthDTO {

    private static final long serialVersionUID = 1L;

    private Long idUser;

    private String name;

    private String lastName;

    private String email;

    private RoleDTO role;

    private String token;

    private List<Booking> bookingList;
}
