package Grupo7.DHBooking.Exceptions.Entities;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="images")
@Getter
@Setter
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_image")
    private Long idImage;

    @Column
    private String title;

    @Column
    private String url;

    @JsonIncludeProperties(value = {"idProduct"})
    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "id_product", insertable = false, updatable = false)
    private Product product;
}
