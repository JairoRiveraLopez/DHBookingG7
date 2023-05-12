package Grupo7.DHBooking.Service;

import Grupo7.DHBooking.Exceptions.Entities.CancellationPolity;

import java.util.List;

public interface ICancellationPolityService {
    List<CancellationPolity> getAll();
}
