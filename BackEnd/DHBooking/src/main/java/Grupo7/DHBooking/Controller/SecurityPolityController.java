package Grupo7.DHBooking.Controller;

import Grupo7.DHBooking.Exceptions.Entities.NormPolicy;
import Grupo7.DHBooking.Exceptions.Entities.SecurityPolicy;
import Grupo7.DHBooking.Service.INormPolityService;
import Grupo7.DHBooking.Service.ISecurityPolityService;
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
@RequestMapping("securityPolicies")
public class SecurityPolityController {

    @Autowired
    private ISecurityPolityService securityPolityService;

    @GetMapping
    public ResponseEntity<List<SecurityPolicy>> getAllNormPolicies(){
        return new ResponseEntity<>(securityPolityService.getAll(), HttpStatus.OK);
    }
}
