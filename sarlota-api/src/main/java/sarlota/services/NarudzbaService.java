package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sarlota.entities.Kontakt;
import sarlota.entities.Narudzba;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.NarudzbaDTO;
import sarlota.repositories.NarudzbaRepository;
import sarlota.repositories.ZaposleniRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NarudzbaService {
    private final NarudzbaRepository narudzbaRepository;

    public List<Narudzba> getAll() {
        return narudzbaRepository.findAll();
    }

    public Narudzba getOne(int id) {
        return narudzbaRepository.findById(id).orElse(null);
    }

    public Narudzba add(NarudzbaDTO narudzbaDTO) {

        Narudzba narudzba = new Narudzba(
                null,
                narudzbaDTO.getDatumPrijema(),
                narudzbaDTO.getDatumIsporuke(),
                narudzbaDTO.getAktivna(),
                narudzbaDTO.getBrojKomada(),
                narudzbaDTO.getNaziv(),
                narudzbaDTO.getNapomene(),
                narudzbaDTO.getSlika(),
                narudzbaDTO.getKontakt(),
                narudzbaDTO.getAdresa(),
                narudzbaDTO.getImeNarucioca(),
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
        narudzba.setBrojKomada(narudzbaDTO.getBrojKomada());
        narudzba.setNaziv(narudzbaDTO.getNaziv());
        narudzba.setNapomene(narudzbaDTO.getNapomene());
        narudzba.setSlika(narudzbaDTO.getSlika());
        narudzba.setImeNarucioca(narudzbaDTO.getImeNarucioca());
        narudzba.setKontakt(narudzbaDTO.getKontakt());
        narudzba.setAdresa(narudzbaDTO.getAdresa());

        return narudzbaRepository.save(narudzba);
    }

    public List<Narudzba> search(String keyword) {
        try {
            int id = Integer.parseInt(keyword);
            Narudzba k = narudzbaRepository.findById(id).orElse(null);
            List<Narudzba> narudzbe = new ArrayList<Narudzba>();
            if (k != null) {
                narudzbe.add(k);
            }
            return narudzbe;
        } catch (NumberFormatException e) {
        }
        return narudzbaRepository.findByKeyword("%" + keyword + "%");
    }

    public void delete(int id) {
        narudzbaRepository.deleteById(id);
    }

    public List<Narudzba> searchByDeliveryDate(LocalDateTime startDate, LocalDateTime endDate) {
        return narudzbaRepository.findByDatumIsporuke(startDate, endDate);
    }

    public List<Narudzba> searchByOrderDate(LocalDateTime startDate, LocalDateTime endDate) {
        return narudzbaRepository.findByDatumPrijema(startDate, endDate);
    }

    public List<Narudzba> filter(String today, String tomorrow) {
        return narudzbaRepository.findAll().stream()
                .filter(elem -> (today != null && String.valueOf(elem.getDatumIsporuke().toLocalDate())
                        .equals(today)) || (tomorrow != null && String.valueOf(elem.getDatumIsporuke().toLocalDate()).equals(tomorrow)))
                .collect(Collectors.toList());

    }
}
