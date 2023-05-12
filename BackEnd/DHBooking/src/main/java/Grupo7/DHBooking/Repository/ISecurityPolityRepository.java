package Grupo7.DHBooking.Repository;

import Grupo7.DHBooking.Exceptions.Entities.SecurityPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISecurityPolityRepository extends JpaRepository<SecurityPolicy, Long> {
}
