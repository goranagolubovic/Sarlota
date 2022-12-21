package sarlota.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import sarlota.entities.Zaposleni;
import sarlota.entities.requests.ZaposleniUpdateRequest;
import sarlota.services.ZaposleniService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/zaposleni")
@RequiredArgsConstructor
public class ZaposleniController {
    private final ZaposleniService zaposleniService;

    @GetMapping
    public ResponseEntity<List<Zaposleni>> getAll(Authentication auth) {
        return ResponseEntity.ok(zaposleniService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Zaposleni> getOne(@PathVariable int id, Authentication auth) {
        Zaposleni z = zaposleniService.getOne(id);
        return z == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(z);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Zaposleni> update(@PathVariable int id, @RequestBody ZaposleniUpdateRequest request, Authentication auth) {
        try {
            Zaposleni requester = (Zaposleni) auth.getPrincipal();
            if(requester.getId().equals(id)){
               return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
            Zaposleni z = zaposleniService.update(id, request);
            return z == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(z);
        }
        catch (Exception e) {
            return ResponseEntity.status((HttpStatus.ALREADY_REPORTED)).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            zaposleniService.delete(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
