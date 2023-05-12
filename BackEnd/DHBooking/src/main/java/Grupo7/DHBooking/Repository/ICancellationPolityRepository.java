package Grupo7.DHBooking.Repository;

import Grupo7.DHBooking.Exceptions.Entities.CancellationPolity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICancellationPolityRepository extends JpaRepository<CancellationPolity, Long> {
}
