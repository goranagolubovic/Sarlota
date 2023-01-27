package sarlota.entities.requests;

import lombok.Data;
import sarlota.entities.enums.Role;

import java.math.BigDecimal;

@Data
public class ZaposleniUpdateRequest {

//    private String korisnickoIme;
    private String ime;
    private String prezime;
//    private String lozinka;
    private BigDecimal plata;
    private Role tipZaposlenog;

}
