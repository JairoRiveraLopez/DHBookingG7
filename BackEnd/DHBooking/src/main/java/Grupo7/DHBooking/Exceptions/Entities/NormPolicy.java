package Grupo7.DHBooking.Exceptions.Entities;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "norm_policy")
@Getter
@Setter
public class NormPolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_norm_policy")
    private Long idNormPolity;

    @Column
    private String description;

    @JsonIgnore
    @ManyToMany(mappedBy = "normPolicy",fetch=FetchType.LAZY)
    private List<Product> productList;
}
