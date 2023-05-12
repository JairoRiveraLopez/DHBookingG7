package Grupo7.DHBooking.Exceptions.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product")
    private Long idProduct;

    @Column
    private String title;

    @Column(name = "title_description")
    private String titleDescription;

    @Column
    private String description;

    @Column
    private Integer quality;

    @Column
    private String distance;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_category")
    private Category category;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_city")
    private City city;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "products_cancellation_polity",
            joinColumns = {@JoinColumn(name = "product_list_id_product")},
            inverseJoinColumns = {@JoinColumn(name = "cancellation_polity_id_cacelation_policy")})
    private List<CancellationPolity> cancellationPolity;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "products_norm_policy",
            joinColumns = {@JoinColumn(name = "security_policy_id_product")},
            inverseJoinColumns = {@JoinColumn(name = "norm_policy_id_norm_policy")})
    private List<NormPolicy> normPolicy;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "products_security_policy",
            joinColumns = {@JoinColumn(name = "product_id_product")},
            inverseJoinColumns = {@JoinColumn(name = "security_policy_id_security_policy")})
    private List<SecurityPolicy> securityPolicy;

    @JsonIncludeProperties(value = {"idImage", "url"})
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_product")
    private List<Image> images;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(name = "products_feature",
            joinColumns = {@JoinColumn(name = "product_list_id_product")},
            inverseJoinColumns = {@JoinColumn(name = "feature_id_feature")})
    private List<Feature> feature;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.MERGE)
    @JoinColumn(name = "id_product")
    private List<Booking> bookingList;

    @JsonIgnoreProperties ({"hibernateLazyInitializer", "handler"})
    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_location")
    private Location location;
}
