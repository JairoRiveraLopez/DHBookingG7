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
@Table(name = "cancellation_policy")
@Getter
@Setter
public class CancellationPolity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cacelation_policy")
    private Long idCancellationPolity;

    @Column
    private String description;

    @JsonIgnore
    @ManyToMany(mappedBy = "cancellationPolity", fetch = FetchType.LAZY)
    private List<Product> productList;

}
