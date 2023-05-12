package Grupo7.DHBooking.Service;

import Grupo7.DHBooking.Exceptions.Entities.Feature;

import java.util.List;

public interface IFeatureService {
    Feature createFeature(Feature feature);
    Feature getFeatureById(Integer idFeature);
    Feature updateFeature(Feature feature);
    void deleteFeature(Integer idFeature);
    List<Feature> getAll();
}
