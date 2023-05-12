package Grupo7.DHBooking.Repository;

import Grupo7.DHBooking.Exceptions.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM users JOIN roles ON users.id_role = roles.id_role WHERE email = :email", nativeQuery = true)
    public User findUserByEmail(String email);

    Optional<User> findByEmail(String email);

}
