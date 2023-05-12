package Grupo7.DHBooking.Controller;

import Grupo7.DHBooking.Auth.UserAuthenticationService;
import Grupo7.DHBooking.Exceptions.Entities.DTO.UserAuthDTO;
import Grupo7.DHBooking.Exceptions.Entities.DTO.UserDTO;
import Grupo7.DHBooking.Service.IUserService;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;
@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private IUserService userService;

    @Autowired
    private UserAuthenticationService authenticationService;

    @Autowired
    private ModelMapper mapper;

    @PostMapping("/login")
    public ResponseEntity<UserAuthDTO> verifyUser(@RequestBody UserDTO userDTO){
        return new ResponseEntity(authenticationService.login(userDTO, false), HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<UserAuthDTO> addUser(@RequestBody UserDTO userDTO) throws IOException {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1,1024, 1, userDTO.getPassword());
        userDTO.setPassword(hash);

        UserDTO userCreated = userService.createUser(userDTO);
        if( userCreated != null){
            Optional<UserAuthDTO> userAuthDTO = authenticationService.login(userCreated, true);
            return new ResponseEntity(userAuthDTO.get(), HttpStatus.CREATED);
        }
        return new ResponseEntity(HttpStatus.CONFLICT);

    }

    @DeleteMapping
    @Transactional
    public ResponseEntity<String> deleteUser(@RequestHeader("UserEmail") String email){
        String answer = userService.deleteUserByEmail(email);
        if (!answer.isEmpty()){
            return new ResponseEntity(answer.getBytes(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity(answer, HttpStatus.NOT_FOUND);
        }
    }

}
