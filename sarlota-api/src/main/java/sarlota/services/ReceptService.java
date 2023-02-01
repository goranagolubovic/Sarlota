package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import sarlota.entities.Ponuda;
import sarlota.entities.Recept;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.ReceptDTO;
import sarlota.repositories.PonudaRepository;
import sarlota.repositories.ReceptRepository;
import sarlota.repositories.ZaposleniRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReceptService {

    private final ReceptRepository receptRepository;

    private final ZaposleniRepository zaposleniRepository;

     private final PonudaRepository ponudaRepository;

    public List<Recept> getAll() {
        return receptRepository.findAll();
    }

    public Recept getOne(int id) {
        return receptRepository.findById(id).orElse(null);
    }

    public Recept add(ReceptDTO receptDTO) {
        Recept recept = new Recept(
                receptDTO.getPriprema(),
                receptDTO.getSastojci(),
                receptDTO.getNaslov(),
                Base64Utils.decodeFromString(receptDTO.getFotografija()),
                null
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
        r.setFotografija(Base64Utils.decodeFromString(receptDTO.getFotografija()));
        return receptRepository.save(r);
    }

    public List<Recept> search(String keyword) {
        try {
            int id = Integer.parseInt(keyword);
            Recept r = receptRepository.findById(id).orElse(null);
            List<Recept> recept = new ArrayList<Recept>();
            if (r != null) {
                recept.add(r);
            }
            return recept;
        } catch (NumberFormatException e) {
        }
        return receptRepository.findByKeyword("%" + keyword + "%");
    }

    public void delete(int id) {
        receptRepository.deleteById(id);
    }
}
