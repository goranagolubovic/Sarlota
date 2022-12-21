package sarlota.services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.LoginResponse;
import sarlota.entities.enums.Role;
import sarlota.entities.requests.LoginRequest;

import java.util.Date;

@Service
public class AuthService{
    private final AuthenticationManager authenticationManager;
    private final ZaposleniService zaposleniService;
    @Value("${authorization.token.expiration-time}")
    private String tokenExpirationTime;
    @Value("${authorization.token.secret}")
    private String tokenSecret;

    public AuthService(AuthenticationManager authenticationManager, ZaposleniService zaposleniService) {
        this.authenticationManager = authenticationManager;
        this.zaposleniService = zaposleniService;
    }

    public LoginResponse logIn(LoginRequest request){
        LoginResponse response = null;
        try{
            //throw new Exception();
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getKorisnickoIme(), request.getLozinka())
            );
           Zaposleni zaposleni = (Zaposleni) authenticate.getPrincipal();

            Zaposleni z =  zaposleniService.getOne(zaposleni.getId());
            response = new LoginResponse(
                    z.getIme(),
                    z.getPrezime(),
                    z.getKorisnickoIme(),
                    z.getLozinka(),
                    z.getPlata(),
                    z.getTipZaposlenog());
            response.setToken(generateJwt(zaposleni));

        }
        catch (Exception ex){
            return null;
        }

    return response;


    }

    private String generateJwt(Zaposleni zaposleni){
        return Jwts.builder()
                .setId(zaposleni.getId().toString())
                .setSubject(zaposleni.getUsername())
                .claim("role", zaposleni.getTipZaposlenog().name())
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(tokenExpirationTime)))
                .signWith(SignatureAlgorithm.HS512, tokenSecret)
                .compact();
    }
}
