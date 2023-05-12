package Grupo7.DHBooking.Service.impl;

import Grupo7.DHBooking.Exceptions.Entities.DTO.UserDTO;
import Grupo7.DHBooking.Exceptions.Entities.User;
import Grupo7.DHBooking.Service.IUserService;
import Grupo7.DHBooking.Repository.IUserRepository;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private ModelMapper mapper;


    @Override
    public UserDTO createUser(UserDTO userDTO) throws IOException {
        Optional<User> userValidation = userRepository.findByEmail(userDTO.getEmail());

        if(!userValidation.isPresent()){
            User userResponse = userRepository.save(mapper.map(userDTO, User.class));
            if (userResponse!= null){
                UserDTO userDTO1 = mapper.map(userResponse, UserDTO.class);
                return userDTO1;
            }
        }

        return null;
    }

    @Override
    public UserDTO readUser(Long id) {
        UserDTO userResponse = null;
        if (userRepository.findById(id).isPresent()) {
            Optional<User> user = userRepository.findById(id);
            userResponse = mapper.map(user.get(), UserDTO.class);
        }
        return userResponse;
    }

    @Override
    public UserDTO updateUser(UserDTO userDTO) {
        User userResponse = userRepository.save(mapper.map(userDTO, User.class));

        return mapper.map(userResponse, UserDTO.class);
    }

    @Override
    public List<UserDTO> listUser() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOS = new ArrayList<>();

        for (User user : users) {
            userDTOS.add(mapper.map(user, UserDTO.class));
        }
        return userDTOS;
    }

    @Override
    public UserDTO verifyCredentials(UserDTO userDTO) {

        UserDTO userDTOResponse = null;

        User userBdd = userRepository.findUserByEmail(userDTO.getEmail());

        String passwordHashed = userBdd.getPassword();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);

        Boolean paswordMatch = argon2.verify(passwordHashed, userDTO.getPassword());

        if (paswordMatch){
            userDTOResponse = mapper.map(userBdd, UserDTO.class);
        }

        return userDTOResponse;

    }

    @Override
    public String deleteUserByEmail(String email) {
        String answer = "";
        User userQuery = getUserByEmail(email);
        if(userQuery != null) {
            userRepository.delete(mapper.map(userQuery, User.class));
            answer = "Se ha eliminado el usuario de forma satisfactoria";
        }
        return answer;
    }

    private User getUserByEmail(String email) {
        Optional<User> userQuery = Optional.ofNullable(userRepository.findUserByEmail(email));
        return userQuery.orElse(null);

    }
}
