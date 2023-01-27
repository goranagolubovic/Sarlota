package sarlota.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sarlota.entities.Kontakt;
import sarlota.entities.Narudzba;
import sarlota.entities.dto.KontaktDTO;
import sarlota.entities.dto.NarudzbaDTO;
import sarlota.services.KontaktService;
import sarlota.services.NarudzbaService;

import java.util.List;

@RestController
@RequestMapping("api/v1/narudzbe")
@RequiredArgsConstructor
public class NarudzbaController {
    private final NarudzbaService narudzbaService;

    @GetMapping
    public ResponseEntity<List<Narudzba>> getAll() {
        return ResponseEntity.ok(narudzbaService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Narudzba> getOne(@PathVariable int id) {
        Narudzba narudzba = narudzbaService.getOne(id);
        return narudzba == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(narudzba);
    }

    @PostMapping
    public ResponseEntity<Narudzba> add(@RequestBody NarudzbaDTO narudzbaDTO) {
        try {
            Narudzba narudzba = narudzbaService.add(narudzbaDTO);
            return narudzba == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(narudzba);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Narudzba> update(@PathVariable int id, @RequestBody NarudzbaDTO narudzbaDTO) {
        try {
            Narudzba narudzba = narudzbaService.update(id, narudzbaDTO);
            return narudzba == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(narudzba);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            narudzbaService.delete(id);
            return ResponseEntity.ok().build();
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
