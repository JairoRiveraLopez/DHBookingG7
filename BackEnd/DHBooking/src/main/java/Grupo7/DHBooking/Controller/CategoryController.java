package Grupo7.DHBooking.Controller;

import Grupo7.DHBooking.Exceptions.Entities.Category;
import Grupo7.DHBooking.Service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private ICategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories(){
        return new ResponseEntity<>(categoryService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getById(@PathVariable Long id){
        Optional<Category> categoryFound = Optional.ofNullable(categoryService.getCategoryById(id));
        if(categoryFound.isPresent()){
            return ResponseEntity.ok(categoryFound.get());
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category){
        return new ResponseEntity<>(categoryService.createCategory(category), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Category> updateCategory(@RequestBody Category category){
        Optional<Category> categoryToUpdate = Optional.ofNullable(categoryService.getCategoryById(category.getIdCategory()));
        if (categoryToUpdate.isPresent()){
            return ResponseEntity.ok(categoryService.updateCategory(category));
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> DeleteById(@PathVariable Long id){
        Optional<Category> categoryQuery = Optional.ofNullable(categoryService.getCategoryById(id));
        if (categoryQuery.isPresent()){
            categoryService.deleteCategory(id);
            return ResponseEntity.ok("La categoria con ID = " + id + " ha sido eliminada.");
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}