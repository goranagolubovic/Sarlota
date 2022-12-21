package sarlota.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import sarlota.entities.Zaposleni;
import sarlota.entities.enums.Role;
import sarlota.services.AuthService;


import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;


@Component
public class AuthorizationFilter extends OncePerRequestFilter {

    @Value("${authorization.token.expiration-time}")
    private String tokenExpirationTime;
    @Value("${authorization.token.secret}")
    private String tokenSecret;

    @Value("${authorization.token.header.name}")
    private String authorizationHeaderName;
    @Value("${authorization.token.header.prefix}")
    private String authorizationHeaderPrefix;
    @Value("${authorization.token.secret}")
    private String authorizationSecret;


    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = httpServletRequest.getHeader(authorizationHeaderName);
        if(authorizationHeader == null || !authorizationHeader.startsWith(authorizationHeaderPrefix)){
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }
        String token  = authorizationHeader.replace(authorizationHeaderPrefix, "");
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(authorizationSecret)
                    .parseClaimsJws(token)
                    .getBody();
            Zaposleni z = new Zaposleni(Integer.valueOf(claims.getId()), claims.getSubject(), null, Role.valueOf(claims.get("role", String.class)));
            Authentication authentication = new UsernamePasswordAuthenticationToken(z, null, z.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        catch (SignatureException e) {
            System.out.println("Invalid JWT signature.");
        }
        catch (MalformedJwtException e) {
            System.out.println("Invalid JWT token.");}
        catch (ExpiredJwtException e) {
            Zaposleni z = new Zaposleni(Integer.valueOf(e.getClaims().getId()), e.getClaims().getSubject(), null, Role.valueOf(e.getClaims().get("role", String.class)));
            String s = generateJwt(z);
            httpServletResponse.resetBuffer();
            httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            httpServletResponse.setHeader("Content-Type", "application/json");
            String responseString = "{\"New Token\":" + "\"" + s + "\"\n}";
            httpServletResponse.getOutputStream().print(responseString);
            httpServletResponse.flushBuffer();
            return;
        }
        catch (UnsupportedJwtException e) {
            System.out.println("Unsupported JWT token.");
        }
        catch (IllegalArgumentException e) {
            System.out.println("JWT token compact of handler are invalid.");
        }


       filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private String generateJwt(Zaposleni zaposleni){
        return Jwts.builder()
                .setId(zaposleni.getId().toString())
                .setSubject(zaposleni.getUsername())
                .claim("role", zaposleni.getTipZaposlenog().name())
                .setExpiration(new Date(System.currentTimeMillis() + 900000))
                .signWith(SignatureAlgorithm.HS512, tokenSecret)
                .compact();
    }

}
