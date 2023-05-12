package Grupo7.DHBooking.Service.impl;

import Grupo7.DHBooking.Exceptions.Entities.CancellationPolity;
import Grupo7.DHBooking.Repository.ICancellationPolityRepository;
import Grupo7.DHBooking.Service.ICancellationPolityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CancellationPolityServiceImpl implements ICancellationPolityService {

    @Autowired
    private ICancellationPolityRepository cancellationPolityRepository;

    @Override
    public List<CancellationPolity> getAll() {
        return cancellationPolityRepository.findAll();
    }

}
