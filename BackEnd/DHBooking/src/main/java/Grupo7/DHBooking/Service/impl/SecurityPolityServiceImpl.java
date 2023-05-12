package Grupo7.DHBooking.Service.impl;

import Grupo7.DHBooking.Exceptions.Entities.SecurityPolicy;
import Grupo7.DHBooking.Repository.ISecurityPolityRepository;
import Grupo7.DHBooking.Service.ISecurityPolityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SecurityPolityServiceImpl implements ISecurityPolityService {

    @Autowired
    private ISecurityPolityRepository securityRepository;

    @Override
    public List<SecurityPolicy> getAll() {
        return securityRepository.findAll();
    }

}
