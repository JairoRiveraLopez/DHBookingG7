package Grupo7.DHBooking.Controller;

import Grupo7.DHBooking.Exceptions.Entities.NormPolicy;
import Grupo7.DHBooking.Service.INormPolityService;
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
@RequestMapping("normPolicies")
public class NormPolityController {

    @Autowired
    private INormPolityService normPolicyService;

    @GetMapping
    public ResponseEntity<List<NormPolicy>> getAllNormPolicies(){
        return new ResponseEntity<>(normPolicyService.getAll(), HttpStatus.OK);
    }

}
