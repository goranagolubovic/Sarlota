package sarlota.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Zaposleni {
    @Id@Column(name = "id")
    private Integer id;
    @Basic@Column(name = "ime")
    private String ime;
    @Basic@Column(name = "prezime")
    private String prezime;
    @Basic@Column(name = "korisnicko_ime")
    private String korisnickoIme;
    @Basic@Column(name = "lozinka")
    private String lozinka;
    @Basic@Column(name = "plata")
    private Double plata;
    @Basic@Column(name = "tip_zaposlenog")
    private Integer tipZaposlenog;
    @JsonIgnore
    @OneToMany(mappedBy = "zaposleniByZaposleniId")
    private List<Kontakt> kontaktsById;
    @JsonIgnore
    @OneToMany(mappedBy = "zaposleniByZaposleniId")
    private List<Narudzba> narudzbasById;
    @JsonIgnore
    @OneToMany(mappedBy = "zaposleniByZaposleniId")
    private List<Recept> receptsById;
    @JsonIgnore
    @OneToMany(mappedBy = "zaposleniByZaposleniId")
    private List<Zaduzenje> zaduzenjesById;



}
