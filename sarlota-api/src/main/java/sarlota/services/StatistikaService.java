package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sarlota.entities.Namirnica;
import sarlota.entities.NamirnicaUReceptu;
import sarlota.entities.Narudzba;
import sarlota.entities.Recept;
import sarlota.entities.dto.Potrosnja;
import sarlota.entities.dto.Zarada;
import sarlota.repositories.NamirnicaRepository;
import sarlota.repositories.NamirnicaUReceptuRepository;
import sarlota.repositories.NarudzbaRepository;
import sarlota.repositories.ReceptRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatistikaService {

    private final NarudzbaRepository narudzbaRepository;
    private final ReceptRepository receptRepository;
    private final NamirnicaRepository namirnicaRepository;
    private final NamirnicaUReceptuRepository namirnicaUReceptuRepository;


    public Double profit() throws Exception {
        List<Narudzba> narudzbe = narudzbaRepository.findAll();
        Double ukupnaPotrosnja = null;
        Double ukupnaZarada = narudzbe.stream().mapToDouble(n -> n.getCijena()).sum();

        ukupnaPotrosnja = narudzbe.stream().mapToDouble(n -> {
            Recept r = receptRepository.findById(n.getIdRecepta()).orElse(null);
            if (r == null) return 0.0;
            List<NamirnicaUReceptu> namirnicaUReceptu = namirnicaUReceptuRepository.findByIdRecepta(r.getId());
            return namirnicaUReceptu.stream().mapToDouble(nu -> {
                Namirnica nam = namirnicaRepository.findById(nu.getIdNamirnice()).orElse(null);
                if (nam == null) return 0.0;
                return nu.getKolicina() * nam.getCijenaPoJedinici();
            }).sum();

        }).sum();

        if (ukupnaZarada == 0.0) throw new Exception();
        return ukupnaZarada - ukupnaPotrosnja;
    }


    public List<Potrosnja> expensesLastNDays(int brojDana) {
        List<Narudzba> narudzbe = narudzbaRepository.findAll();
        List<Potrosnja> potrosnje = new ArrayList<Potrosnja>();

        for (int i = 0; i < brojDana; ++i) {
            LocalDateTime ld = LocalDate.now().minusDays(i).atStartOfDay();
            Double potrosnjaZaDan = narudzbe.stream().filter(n -> n.getDatumIsporuke().compareTo(ld) >= 0 && n.getDatumIsporuke().compareTo(ld.plusDays(1)) < 0).mapToDouble(n -> {
                Recept r = receptRepository.findById(n.getIdRecepta()).orElse(null);
                if (r == null) return 0.0;
                List<NamirnicaUReceptu> namirnicaUReceptu = namirnicaUReceptuRepository.findByIdRecepta(r.getId());
                return namirnicaUReceptu.stream().mapToDouble(nu -> {
                    Namirnica nam = namirnicaRepository.findById(nu.getIdNamirnice()).orElse(null);
                    if (nam == null) return 0.0;
                    return nu.getKolicina() * nam.getCijenaPoJedinici();
                }).sum();

            }).sum();
            potrosnje.add(new Potrosnja(ld.toLocalDate(), potrosnjaZaDan));
        }
        return potrosnje;
    }

    public List<Zarada> profitLastNDays(int brojDana) {
        List<Narudzba> narudzbe = narudzbaRepository.findAll();
        List<Zarada> zarade = new ArrayList<Zarada>();
        for (int i = 0; i < brojDana; ++i) {
            LocalDateTime ld = LocalDate.now().minusDays(i).atStartOfDay();

            Double troskovi = narudzbe.stream().filter(n -> n.getDatumIsporuke().compareTo(ld) >= 0 && n.getDatumIsporuke().compareTo(ld.plusDays(1)) < 0).mapToDouble(n -> {
                Recept r = receptRepository.findById(n.getIdRecepta()).orElse(null);
                if (r == null) return 0.0;
                List<NamirnicaUReceptu> namirnicaUReceptu = namirnicaUReceptuRepository.findByIdRecepta(r.getId());

                return namirnicaUReceptu.stream().mapToDouble(nu -> {
                    Namirnica nam = namirnicaRepository.findById(nu.getIdNamirnice()).orElse(null);
                    if (nam == null) return 0.0;
                    return nu.getKolicina() * nam.getCijenaPoJedinici();
                }).sum();
            }).sum();

            Double ukupnaZarada = narudzbe.stream().filter(n -> n.getDatumIsporuke().compareTo(ld) >= 0 && n.getDatumIsporuke().compareTo(ld.plusDays(1)) < 0).
                    mapToDouble(n -> n.getCijena()).sum();

            zarade.add(new Zarada(ld.toLocalDate(), ukupnaZarada - troskovi));
        }
        return zarade;
    }
}
