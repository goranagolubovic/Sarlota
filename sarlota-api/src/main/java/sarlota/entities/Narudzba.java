package sarlota.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Narudzba {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id@Column(name = "id")
    private Integer id;
    @Basic@Column(name = "datum_prijema")
    private LocalDateTime datumPrijema;
    @Basic@Column(name = "datum_isporuke")
    private LocalDateTime datumIsporuke;
    @Basic@Column(name = "opis")
    private String opis;
    @Basic@Column(name = "aktivna")
    private Boolean aktivna;
    @ManyToOne
    @JoinColumn(name = "zaposleni_id", referencedColumnName = "id", nullable = false)
    private Zaposleni zaposleniByZaposleniId;
    @JsonIgnore
    @OneToMany(mappedBy = "narudzbaByNarudzbaId")
    private List<Proizvod> proizvodsById;

}
