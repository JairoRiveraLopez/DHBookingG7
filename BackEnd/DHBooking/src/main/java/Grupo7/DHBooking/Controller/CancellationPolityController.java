package Grupo7.DHBooking.Controller;

import Grupo7.DHBooking.Exceptions.Entities.CancellationPolity;
import Grupo7.DHBooking.Service.ICancellationPolityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("cancellationPolicies")
public class CancellationPolityController {

    @Autowired
    private ICancellationPolityService cancellationPolityService;

    @GetMapping
    public ResponseEntity<List<CancellationPolity>> getAllCancellationPolicies(){
        return new ResponseEntity<>(cancellationPolityService.getAll(), HttpStatus.OK);
    }

}
