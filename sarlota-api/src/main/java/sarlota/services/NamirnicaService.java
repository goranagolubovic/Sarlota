package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import sarlota.entities.Kontakt;
import sarlota.entities.Namirnica;
import sarlota.repositories.NamirnicaRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NamirnicaService {

    private final NamirnicaRepository namirnicaRepository;

    public List<Namirnica> getAll(){
        return namirnicaRepository.findAll();
    }

    public Namirnica getById(int id){
        return namirnicaRepository.findById(id).orElse(null);
    }
}
