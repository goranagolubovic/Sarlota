package sarlota.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sarlota.entities.Recept;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.ReceptDTO;
import sarlota.services.ReceptService;

import java.util.List;

@RestController
@RequestMapping("api/v1/recepti")
@RequiredArgsConstructor
public class ReceptController {
    private final ReceptService receptService;

    @GetMapping
    public ResponseEntity<List<Recept>> getAll() {
        return ResponseEntity.ok(receptService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recept> getOne(@PathVariable int id) {
        Recept r = receptService.getOne(id);
        return r == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(r);
    }

    @PostMapping
    public ResponseEntity<Recept> add(@RequestBody ReceptDTO receptDTO) {
        try {
            Recept r = receptService.add(receptDTO);
            return r == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(r);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recept> update(@PathVariable int id, @RequestBody ReceptDTO receptDTO) {
        try {
            Recept r = receptService.update(id, receptDTO);
            return r == null ? ResponseEntity.status(HttpStatus.NOT_FOUND).build() : ResponseEntity.ok(r);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/search")
    ResponseEntity<List<Recept>> search(@RequestParam(value = "query") String keyword) {
        if(keyword.length() == 0) return ResponseEntity.ok(receptService.getAll());
        else return ResponseEntity.ok(receptService.search(keyword));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            receptService.delete(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
