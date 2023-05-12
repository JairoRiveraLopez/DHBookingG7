package Grupo7.DHBooking.Repository;

import Grupo7.DHBooking.Exceptions.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "select * from products where id_category = :categoryId",
            nativeQuery = true)
    List<Product> findByCategory (Long categoryId);

    @Query(value = "select * from products where id_city = :cityId",
            nativeQuery = true)
    List<Product> findByCity (Long cityId);

    @Query(value = "SELECT * FROM products ORDER BY RAND() LIMIT 4;",
            nativeQuery = true)
    List<Product> getRandomProducts();

    @Query(value = "SELECT * FROM products LIMIT 4;",
            nativeQuery = true)
    List<Product> getRecommendedProducts();


}
