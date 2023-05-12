package Grupo7.DHBooking.Controller;

import Grupo7.DHBooking.Exceptions.Entities.City;
import Grupo7.DHBooking.Exceptions.Entities.Feature;
import Grupo7.DHBooking.Service.IFeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("features")
public class FeatureController {

    @Autowired
    private IFeatureService featureService;

    @GetMapping
    public ResponseEntity<List<Feature>> getAllFeatures(){
        System.out.println("Entre");
        return new ResponseEntity<>(featureService.getAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Feature> createFeatures(@RequestBody Feature feature){
        return new ResponseEntity<>(featureService.createFeature(feature), HttpStatus.CREATED);
    }
}
