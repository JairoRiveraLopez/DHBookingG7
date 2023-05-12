package Grupo7.DHBooking.Controller;


import Grupo7.DHBooking.Exceptions.Entities.City;
import Grupo7.DHBooking.Service.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin
@RestController
@RequestMapping("cities")
public class CityController {

    @Autowired
    private ICityService cityService;


    @GetMapping
    public ResponseEntity<List<City>> getAllCities(){
        return new ResponseEntity<>(cityService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> getCitytById(@PathVariable Integer id){
        Optional<City> cityFound = Optional.ofNullable(cityService.getCityById(id));
        if(cityFound.isPresent()){
            return ResponseEntity.ok(cityFound.get());
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping
    public ResponseEntity<City> updateCity(@RequestBody City city){
        Optional<City> cityToUpdate = Optional.ofNullable(cityService.getCityById(city.getIdCity()));
        if (cityToUpdate.isPresent()){
            return ResponseEntity.ok(cityService.updateCity(city));
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCity(@PathVariable Integer id){
        Optional<City> cityQuery = Optional.ofNullable(cityService.getCityById(id));
        if (cityQuery.isPresent()){
            cityService.deleteCity(id);
            return ResponseEntity.ok("La ciudad con ID = " + id + " ha sido eliminada.");
        }
        else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
