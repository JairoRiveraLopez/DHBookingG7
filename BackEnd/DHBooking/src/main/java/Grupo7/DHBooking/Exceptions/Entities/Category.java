package Grupo7.DHBooking.Exceptions.Entities;

import com.fasterxml.jackson.annotation.*;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "categories")
@Getter
@Setter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_category")
    private Long idCategory;

    @Column
    private String title;

    @Column
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private List<Product> productList;
}