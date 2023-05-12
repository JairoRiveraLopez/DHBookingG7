package Grupo7.DHBooking.Service.impl;

import Grupo7.DHBooking.Exceptions.Entities.Feature;
import Grupo7.DHBooking.Repository.IFeatureRepository;
import Grupo7.DHBooking.Service.IFeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeatureServiceImpl implements IFeatureService {
    @Autowired
    private IFeatureRepository featureRepository;

    @Override
    public List<Feature> getAll() {return featureRepository.findAll();};

    @Override
    public Feature createFeature(Feature feature) { return featureRepository.save(feature);}

    @Override
    public Feature getFeatureById(Integer idFeature) { return featureRepository.findById(idFeature).get();}

    @Override
    public Feature updateFeature(Feature feature) {return featureRepository.save(feature);}

    @Override
    public void deleteFeature(Integer idFeature) { featureRepository.deleteById(idFeature);}

}
