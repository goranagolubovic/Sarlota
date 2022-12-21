package sarlota.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import sarlota.entities.dto.LoginResponse;
import sarlota.entities.requests.LoginRequest;
import sarlota.entities.requests.SignUpRequest;
import sarlota.services.AuthService;
import sarlota.services.ZaposleniService;

@RestController
public class AuthController {
    private final AuthService service;
    private final ZaposleniService zaposleniService;

    public AuthController(AuthService service, ZaposleniService zaposleniService) {
        this.service = service;
        this.zaposleniService = zaposleniService;
    }

    @PostMapping("log-in")
    public ResponseEntity<LoginResponse> logIn(@RequestBody LoginRequest request) {
        LoginResponse response = service.logIn(request);
        return response == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(response);
    }

    @PostMapping("sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest request) {

        try {
            zaposleniService.signUp(request);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
