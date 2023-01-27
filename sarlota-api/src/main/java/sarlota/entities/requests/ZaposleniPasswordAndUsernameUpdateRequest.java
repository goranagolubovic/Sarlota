package sarlota.entities.requests;

import lombok.Data;

@Data
public class ZaposleniPasswordAndUsernameUpdateRequest {
    private String lozinka;
    private String novaLozinka;
    private String korisnickoIme;
    private String novoKorisnickoIme;
}
