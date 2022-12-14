package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sarlota.entities.Kontakt;
import sarlota.entities.Narudzba;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.KontaktDTO;
import sarlota.entities.dto.NarudzbaDTO;
import sarlota.repositories.NarudzbaRepository;
import sarlota.repositories.ZaposleniRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NarudzbaService {
    private final NarudzbaRepository narudzbaRepository;
    private final ZaposleniRepository zaposleniRepository;

    public List<Narudzba> getAll() { return narudzbaRepository.findAll(); }

    public Narudzba getOne(int id){
        return narudzbaRepository.findById(id).orElse(null);
    }

    public Narudzba add(NarudzbaDTO narudzbaDTO){
        Zaposleni zaposleni = zaposleniRepository.findById(narudzbaDTO.getIdZaposlenog()).orElse(null);
        if(zaposleni == null) {
            return null;
        }

        Narudzba narudzba = new Narudzba(
                null,
                narudzbaDTO.getDatumPrijema(),
                narudzbaDTO.getDatumIsporuke(),
                narudzbaDTO.getOpis(),
                narudzbaDTO.getAktivna(),
                zaposleni,
                null
        );

        return narudzbaRepository.save(narudzba);
    }

    public Narudzba update(int id, NarudzbaDTO narudzbaDTO) {
        Narudzba narudzba = narudzbaRepository.findById(id).orElse(null);
        if (narudzba == null) {
            return null;
        }

        narudzba.setDatumIsporuke(narudzbaDTO.getDatumIsporuke());
        narudzba.setDatumPrijema(narudzbaDTO.getDatumPrijema());
        narudzba.setOpis(narudzbaDTO.getOpis());
        narudzba.setAktivna(narudzbaDTO.getAktivna());

        return narudzbaRepository.save(narudzba);
    }

    public void delete(int id) {
        narudzbaRepository.deleteById(id);
    }
}
