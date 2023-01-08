package sarlota.entities.requests;

import lombok.Data;

@Data
public class LoginRequest {
    private String korisnickoIme;
    private String lozinka;
}
