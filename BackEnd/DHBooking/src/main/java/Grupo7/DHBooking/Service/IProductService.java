package Grupo7.DHBooking.Service;

import Grupo7.DHBooking.Exceptions.Entities.Product;

import java.util.List;

public interface IProductService {

    Product createProduct(Product product);
    Product getProductById(Long idProduct);
    Product updateProduct(Product product);

    List<Product> getByCategory(Long categoryId);

    List<Product> getByCity(Long cityId);
    void deleteProduct(Long idProduct);
    List<Product> getAll();

    List<Product> getRandomProducts();
    List<Product> getRecommendedProducts();


}
