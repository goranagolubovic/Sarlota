package sarlota.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Narudzba {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "datum_prijema")
    private LocalDateTime datumPrijema;
    @Basic
    @Column(name = "datum_isporuke")
    private LocalDateTime datumIsporuke;
    @Basic
    @Column(name = "aktivna")
    private Boolean aktivna;
    @Basic
    @Column(name = "broj_komada")
    private Integer brojKomada;
    @Basic
    @Column(name = "naziv")
    private String naziv;
    @Basic
    @Column(name = "napomene")
    private String napomene;
    @Basic
    @Column(name = "slika")
    private String slika;
    @Basic
    @Column(name = "kontakt")
    private String kontakt;
    @Basic
    @Column(name = "adresa")
    private String adresa;
    @Basic
    @Column(name = "ime_narucioca")
    private String imeNarucioca;
    @JsonIgnore
    @OneToMany(mappedBy = "narudzbaByNarudzbaId")
    private List<Proizvod> proizvodsById;

}
