package sarlota.entities;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Recept {
    @Basic@Column(name = "priprema")
    private String priprema;
    @Basic@Column(name = "naslov")
    private String naslov;
    @Basic@Column(name = "sastojci")
    private String sastojci;
    @Lob
    @Column (name = "fotografija")
    private byte[] fotografija;
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id@Column(name = "id")
    private Integer id;
}
