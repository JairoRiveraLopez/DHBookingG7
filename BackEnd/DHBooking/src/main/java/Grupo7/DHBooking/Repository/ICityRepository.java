package Grupo7.DHBooking.Repository;

import Grupo7.DHBooking.Exceptions.Entities.City;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
@Repository
public interface ICityRepository extends JpaRepository<City, Integer> {
}
