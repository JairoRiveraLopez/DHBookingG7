package Grupo7.DHBooking.Service;

import Grupo7.DHBooking.Exceptions.Entities.SecurityPolicy;

import java.util.List;

public interface ISecurityPolityService {

    List<SecurityPolicy> getAll();
}
