package Grupo7.DHBooking.Service.impl;

import Grupo7.DHBooking.Exceptions.Entities.NormPolicy;
import Grupo7.DHBooking.Repository.INormPolityRepository;
import Grupo7.DHBooking.Service.INormPolityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NormPolityServiceImpl implements INormPolityService {

    @Autowired
    private INormPolityRepository normPolicyRepository;


    @Override
    public List<NormPolicy> getAll() {
        return normPolicyRepository.findAll();
    }
}
