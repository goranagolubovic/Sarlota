package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sarlota.entities.Ponuda;
import sarlota.entities.Recept;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.ReceptDTO;
import sarlota.repositories.ReceptRepository;
import sarlota.repositories.ZaposleniRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReceptService {

    private final ReceptRepository receptRepository;

    private final ZaposleniRepository zaposleniRepository;

    // private final PonudaRepository ponudaRepository;

    public List<Recept> getAll() {
        return receptRepository.findAll();
    }

    public Recept getOne(int id) {
        return receptRepository.findById(id).orElse(null);
    }

    public Recept add(ReceptDTO receptDTO) {
        Zaposleni zaposleni = zaposleniRepository.findById(receptDTO.getIdZaposlenog()).orElse(null);
        Ponuda ponuda = ponudaRepository.findById(receptDTO.getIdPonude()).orElse(null);
        if (zaposleni == null || ponuda == null) {
            return null;
        }
        Recept recept = new Recept(
                receptDTO.getPriprema(),
                receptDTO.getSastojci(),
                null,
                ponuda,
                zaposleni
        );
        return receptRepository.save(recept);
    }

    public Recept update(int id, ReceptDTO receptDTO) {
        Recept r = receptRepository.findById(id).orElse(null);
        if (r == null) {
            return null;
        }
        r.setPriprema(receptDTO.getPriprema());
        r.setSastojci(receptDTO.getSastojci());
        return receptRepository.save(r);
    }

    public void delete(int id) {
        receptRepository.deleteById(id);
    }
}
