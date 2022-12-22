package sarlota.services;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.LoginResponse;
import sarlota.entities.dto.RefreshResponse;
import sarlota.entities.enums.Role;
import sarlota.entities.requests.LoginRequest;
import sarlota.entities.requests.RefreshRequest;

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

    public LoginResponse login(LoginRequest request){
        LoginResponse response = null;
        try {
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

    public RefreshResponse refreshToken(RefreshRequest request){
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(tokenSecret)
                    .parseClaimsJws(request.getToken())
                    .getBody();

        }
        catch(ExpiredJwtException e){
            Zaposleni z = new Zaposleni(Integer.valueOf(e.getClaims().getId()), e.getClaims().getSubject(), null, Role.valueOf(e.getClaims().get("role", String.class)));
            return new RefreshResponse(generateJwt(z));
        }

        return null;

    }

    public String generateJwt(Zaposleni zaposleni){
        return Jwts.builder()
                .setId(zaposleni.getId().toString())
                .setSubject(zaposleni.getUsername())
                .claim("role", zaposleni.getTipZaposlenog().name())
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(tokenExpirationTime)))
                .signWith(SignatureAlgorithm.HS512, tokenSecret)
                .compact();
    }
}
