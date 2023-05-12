package Grupo7.DHBooking.Service.impl;

import Grupo7.DHBooking.Exceptions.Entities.Product;
import Grupo7.DHBooking.Service.IProductService;
import Grupo7.DHBooking.Repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    private IProductRepository productRepository;

    @Override
    public List<Product> getAll() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getRandomProducts() {
        return productRepository.getRandomProducts();
    }

    @Override
    public List<Product> getRecommendedProducts() {
        return productRepository.getRecommendedProducts();
    }

    @Override
    public Product getProductById(Long idProduct) {
        return productRepository.findById(idProduct).get();
    }
    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }
    @Override
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> getByCategory(Long categoryId) {
        return productRepository.findByCategory(categoryId);
    }

    @Override
    public List<Product> getByCity(Long cityId) {
        return productRepository.findByCity(cityId);
    }

    @Override
    public void deleteProduct(Long idProduct) {
        productRepository.deleteById(idProduct);
    }

}
