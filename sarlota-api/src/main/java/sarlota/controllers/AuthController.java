package sarlota.controllers;

import io.jsonwebtoken.impl.DefaultClaims;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import sarlota.entities.dto.LoginResponse;
import sarlota.entities.requests.LoginRequest;
import sarlota.entities.requests.RefreshRequest;
import sarlota.entities.requests.SignUpRequest;
import sarlota.services.AuthService;
import sarlota.services.ZaposleniService;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

@RestController
public class AuthController {

    @Value("${authorization.token.header.name}")
    private String authorizationHeaderName;
    @Value("${authorization.token.header.prefix}")
    private String authorizationHeaderPrefix;
    @Value("${authorization.token.secret}")
    private String authorizationSecret;

    private final AuthService service;
    private final ZaposleniService zaposleniService;

    public AuthController(AuthService service, ZaposleniService zaposleniService) {
        this.service = service;
        this.zaposleniService = zaposleniService;
    }

    @PostMapping("login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = service.login(request);
        return response == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(response);
    }

    @PostMapping("signup")
    public ResponseEntity<?> signup(@RequestBody SignUpRequest request) {

        try {
            zaposleniService.signup(request);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(value = "/refreshtoken")
    public ResponseEntity<?> refreshToken(HttpServletRequest httpServletRequest) throws Exception {
        String authorizationHeader = httpServletRequest.getHeader(authorizationHeaderName);
        if(authorizationHeader == null || !authorizationHeader.startsWith(authorizationHeaderPrefix)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        String token  = authorizationHeader.replace(authorizationHeaderPrefix, "");
        try {

            return ResponseEntity.ok(service.refreshToken(new RefreshRequest(token)));
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

}
