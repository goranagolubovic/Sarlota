package sarlota.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import sarlota.entities.Zaposleni;
import sarlota.entities.enums.Role;

import java.math.BigDecimal;


@AllArgsConstructor
@Data
public class LoginResponse extends ZaposleniDTO {
    public LoginResponse(String ime, String prezime, String korisnickoIme, String lozinka, BigDecimal plata, Role tipZaposlenog){
        super(ime, prezime, korisnickoIme, lozinka, plata, tipZaposlenog);
    }
    private String token;
}
