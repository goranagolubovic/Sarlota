package sarlota.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sarlota.entities.dto.NabavkaDTO;
import sarlota.services.NabavkaService;

import java.util.List;

@RestController
@RequestMapping("api/v1/nabavke")
@RequiredArgsConstructor
public class NabavkaController {

    private final NabavkaService nabavkaService;

    @GetMapping
    public ResponseEntity<List<NabavkaDTO>> getAll() {
        return ResponseEntity.ok(nabavkaService.getAll());
    }

}
