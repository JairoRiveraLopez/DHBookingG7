package Grupo7.DHBooking.Repository;

import Grupo7.DHBooking.Exceptions.Entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICategoryRepository extends JpaRepository<Category, Long> {

    @Query(value = "SELECT c.id_category, c.image_url, c.title, COUNT(p.id_product) description FROM categories c\n" +
            "INNER JOIN products p ON c.id_category = p.id_category\n" +
            "group by id_category;",
            nativeQuery = true)
    List<Category> findAllWithCount ();

}
