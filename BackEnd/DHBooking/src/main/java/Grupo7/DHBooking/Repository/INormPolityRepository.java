package Grupo7.DHBooking.Repository;

import Grupo7.DHBooking.Exceptions.Entities.NormPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface INormPolityRepository extends JpaRepository<NormPolicy, Long> {
}
