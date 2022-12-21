package sarlota.controllers;

import io.jsonwebtoken.impl.DefaultClaims;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import sarlota.entities.dto.LoginResponse;
import sarlota.entities.requests.LoginRequest;
import sarlota.entities.requests.SignUpRequest;
import sarlota.services.AuthService;
import sarlota.services.ZaposleniService;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

@RestController
public class AuthController {


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

    /*@GetMapping(value = "/refreshtoken")
    public ResponseEntity<?> refreshtoken(@RequestBody RefreshRequest request) throws Exception {
        // From the HttpRequest get the claims
        DefaultClaims claims = (io.jsonwebtoken.impl.DefaultClaims) request.getAttribute("claims");

        Map<String, Object> expectedMap = getMapFromIoJsonwebtokenClaims(claims);
        String token = jwtUtil.doGenerateRefreshToken(expectedMap, expectedMap.get("sub").toString());
        return ResponseEntity.ok(new AuthenticationResponse(token));
    }*/

}
