package Grupo7.DHBooking.Repository;

import Grupo7.DHBooking.Exceptions.Entities.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFeatureRepository extends JpaRepository<Feature, Integer> {
}
