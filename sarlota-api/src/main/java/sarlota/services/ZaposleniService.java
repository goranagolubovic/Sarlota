package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.ZaposleniDTO;
import sarlota.repositories.ZaposleniRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ZaposleniService {

    private final ZaposleniRepository zaposleniRepository;

    public List<Zaposleni> getAll() { return zaposleniRepository.findAll(); }

    public Zaposleni getOne(int id) { return zaposleniRepository.findById(id).orElse(null); }

    public Zaposleni add(ZaposleniDTO zaposleniDTO){
        Zaposleni zaposleni = new Zaposleni(
                null,
                zaposleniDTO.getIme(),
                zaposleniDTO.getPrezime(),
                zaposleniDTO.getKorisnickoIme(),
                zaposleniDTO.getLozinka(),
                zaposleniDTO.getPlata(),
                zaposleniDTO.getTipZaposlenog(),
                null,
                null,
                null,
                null
        );
        return zaposleniRepository.save(zaposleni);

    }

    public Zaposleni update(int id, ZaposleniDTO zaposleniDTO){
        Zaposleni z = zaposleniRepository.findById(id).orElse(null);
        if(z == null){
            return null;
        }
        z.setIme(zaposleniDTO.getIme());
        z.setPrezime(zaposleniDTO.getPrezime());
        z.setKorisnickoIme(zaposleniDTO.getKorisnickoIme());
        z.setPlata(zaposleniDTO.getPlata());
        z.setLozinka(zaposleniDTO.getLozinka());
        z.setTipZaposlenog(zaposleniDTO.getTipZaposlenog());
        return zaposleniRepository.save(z);
    }

    public void delete(int id){ zaposleniRepository.deleteById(id); }


}
