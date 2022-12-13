package sarlota.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ZaposleniDTO {
    private String ime;
    private String prezime;
    private String korisnickoIme;
    private String lozinka;
    private Double plata;
    private Integer tipZaposlenog;
}
