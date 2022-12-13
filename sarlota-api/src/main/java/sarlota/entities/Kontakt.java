package sarlota.entities;

import lombok.*;

import javax.persistence.*;
import java.util.Objects;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Kontakt {
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "ime")
    private String ime;
    @Basic
    @Column(name = "prezime")
    private String prezime;
    @Basic
    @Column(name = "broj_telefona")
    private String brojTelefona;
    @Basic
    @Column(name = "link_profila")
    private String linkProfila;
    @Basic
    @Column(name = "email")
    private String email;
    @ManyToOne
    @JoinColumn(name = "zaposleni_id", referencedColumnName = "id", nullable = false)
    private Zaposleni zaposleniByZaposleniId;

}
