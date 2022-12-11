package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sarlota.entities.Kontakt;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.KontaktDTO;
import sarlota.repositories.KontaktRepository;
import sarlota.repositories.ZaposleniRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KontaktService {

    private final KontaktRepository kontaktRepository;
    private final ZaposleniRepository zaposleniRepository;

    public List<Kontakt> getAll() {
        return kontaktRepository.findAll();
    }

    public Kontakt getOne(int id) {
        return kontaktRepository.findById(id).orElse(null);
    }

    public Kontakt add(KontaktDTO kontaktDTO) {
        Zaposleni zaposleni = zaposleniRepository.findById(kontaktDTO.getIdZaposlenog()).orElse(null);
        if(zaposleni == null) {
            return null;
        }
        Kontakt kontakt = new Kontakt(
                null,
                kontaktDTO.getIme(),
                kontaktDTO.getPrezime(),
                kontaktDTO.getBrojTelefona(),
                kontaktDTO.getLinkProfila(),
                kontaktDTO.getEmail(),
                zaposleni
        );
        return kontaktRepository.save(kontakt);
    }

    public Kontakt update(int id, KontaktDTO kontaktDTO) {
        Kontakt k = kontaktRepository.findById(id).orElse(null);
        if (k == null) {
            return null;
        }
        k.setEmail(kontaktDTO.getEmail());
        k.setBrojTelefona(kontaktDTO.getBrojTelefona());
        k.setIme(kontaktDTO.getIme());
        k.setPrezime(kontaktDTO.getPrezime());
        k.setLinkProfila(kontaktDTO.getLinkProfila());
        return kontaktRepository.save(k);
    }

    public void delete(int id) {
        kontaktRepository.deleteById(id);
    }
}
