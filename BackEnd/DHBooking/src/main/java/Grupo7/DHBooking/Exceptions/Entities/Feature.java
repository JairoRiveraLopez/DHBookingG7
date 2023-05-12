package Grupo7.DHBooking.Exceptions.Entities;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "features")
@Getter
@Setter
public class Feature {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_feature")
    private Long idFeature;

    @Column
    private String title;

    @Column(name = "url_icon")
    private String url;

    @JsonIgnore
    @ManyToMany(mappedBy = "feature", fetch = FetchType.LAZY)
    private List<Product> productList;
}
