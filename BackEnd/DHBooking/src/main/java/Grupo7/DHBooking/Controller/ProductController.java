package Grupo7.DHBooking.Controller;

import Grupo7.DHBooking.Exceptions.Entities.Product;
import Grupo7.DHBooking.Exceptions.Entities.User;
import Grupo7.DHBooking.Repository.IUserRepository;
import Grupo7.DHBooking.Service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin
@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts(){
        return new ResponseEntity<>(productService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/random")
    public ResponseEntity<List<Product>> getRandomProducts(){
        return new ResponseEntity<>(productService.getRandomProducts(), HttpStatus.OK);
    }

    @GetMapping("/recommended")
    public ResponseEntity<List<Product>> getRecommendedProducts(){
        return new ResponseEntity<>(productService.getRecommendedProducts(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id){
        Optional<Product> productFound = Optional.ofNullable(productService.getProductById(id));
        if(productFound.isPresent()){
            return ResponseEntity.ok(productFound.get());
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/idCategory")
    public ResponseEntity<List<Product>> getByCategory(@RequestParam(required = false) Long idCategory){
        Optional<List<Product>> productCategory = Optional.ofNullable(productService
                .getByCategory(idCategory));
        if (productCategory.isPresent() && !productCategory.get().isEmpty()){
            return new ResponseEntity<>(productCategory.get(), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/idCity")
    public ResponseEntity<List<Product>> getByCity(@RequestParam(required = false) Long idCity){
        Optional<List<Product>> productCity = Optional.ofNullable(productService
                .getByCity(idCity));
        if (productCity.isPresent() && !productCity.get().isEmpty()){
            return new ResponseEntity<>(productCity.get(), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestHeader("UserEmail") String email,
                                                 @RequestBody Product product){
        if(!email.isEmpty()){
            Optional<User> user = Optional.ofNullable(userRepository.findUserByEmail(email));
            if(user.isPresent() && user.get().getRole().getName().equals("ADMIN")){
                return new ResponseEntity<>(productService.createProduct(product), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>(HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<Product> updateProduct(@RequestBody Product product){
        Optional<Product> productToUpdate = Optional.ofNullable(productService.getProductById(product.getIdProduct()));
        if (productToUpdate.isPresent()){
            return ResponseEntity.ok(productService.updateProduct(product));
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<String> deleteProduct(@PathVariable Long id){
        Optional<Product> productQuery = Optional.ofNullable(productService.getProductById(id));
        if (productQuery.isPresent()){
            productService.deleteProduct(id);
            return ResponseEntity.ok("El producto con ID = " + id + " ha sido eliminado.");
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
