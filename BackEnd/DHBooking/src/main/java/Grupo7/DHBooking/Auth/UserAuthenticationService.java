package Grupo7.DHBooking.Auth;



import Grupo7.DHBooking.Exceptions.Entities.DTO.UserAuthDTO;
import Grupo7.DHBooking.Exceptions.Entities.DTO.UserDTO;
import Grupo7.DHBooking.Exceptions.Entities.User;

import java.util.Optional;

public interface UserAuthenticationService {
    /**
     * Logs in with the given {@code email} and {@code password}.
     *
     * @param email
     * @param password
     * @return an {@link Optional} of a user when login succeeds
     */
    Optional<UserAuthDTO> login(UserDTO userDTO, boolean isNew);

    /**
     * Finds a user by its token.
     *
     * @param token user token
     * @return
     */
    Optional<User> findByToken(String token);

    /**
     * Returns a new token
     *
     * @param token the user to logout
     */
    Optional<String> refreshToken(String token);
}
