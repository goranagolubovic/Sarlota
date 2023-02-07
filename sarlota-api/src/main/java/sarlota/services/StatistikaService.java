package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sarlota.entities.Namirnica;
import sarlota.entities.NamirnicaUReceptu;
import sarlota.entities.Narudzba;
import sarlota.entities.Recept;
import sarlota.entities.dto.Potrosnja;
import sarlota.entities.dto.ReceptDTO;
import sarlota.entities.dto.Zarada;
import sarlota.repositories.NamirnicaRepository;
import sarlota.repositories.NamirnicaUReceptuRepository;
import sarlota.repositories.NarudzbaRepository;
import sarlota.repositories.ReceptRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatistikaService {

    private final NarudzbaRepository narudzbaRepository;

    private final ReceptService receptService;

    public double profit(int days) throws Exception {
      List<Zarada> zarada = profitLastNDays(days);
      return zarada.stream().mapToDouble(Zarada::getZarada).sum();
    }


    public List<Potrosnja> expensesLastNDays(int brojDana) {
        List<Narudzba> narudzbe = narudzbaRepository.findAll();
        List<Potrosnja> potrosnje = new ArrayList<>();

        LocalDate today = LocalDate.now().plusDays(1);
        LocalDate end = today.minusDays(brojDana);

        List<LocalDate> datumi = end.datesUntil(today).collect(Collectors.toList());

        for(LocalDate dan : datumi) {
            List<Narudzba> narudzbePoDanu = narudzbe.stream().filter(e -> e.getDatumIsporuke().toLocalDate().isEqual(dan)).collect(Collectors.toList());
            double potrosnja = 0;

            for(Narudzba n : narudzbePoDanu) {
                ReceptDTO receptDTO = receptService.getOne(n.getIdRecepta());
                double trosak = receptDTO.getTrosakIzrade();

                if("Srednja".equals(n.getVelicina())){
                    trosak*=1.5;
                } else if ("Velika".equals(n.getVelicina())){
                    trosak*=2;
                }
                potrosnja+=trosak;
            }

            potrosnje.add(new Potrosnja(dan,potrosnja));
        }

        return potrosnje;
    }

    public List<Zarada> profitLastNDays(int brojDana) {
        List<Zarada> zarade = new ArrayList<>();
        List<Narudzba> narudzbe = narudzbaRepository.findAll();

        LocalDate today = LocalDate.now().plusDays(1);
        LocalDate end = today.minusDays(brojDana);

        List<LocalDate> datumi = end.datesUntil(today).collect(Collectors.toList());

        for(LocalDate dan : datumi) {
            List<Narudzba> narudzbePoDanu = narudzbe.stream().filter(e -> e.getDatumIsporuke().toLocalDate().isEqual(dan)).collect(Collectors.toList());
            double zarada = 0;

            for(Narudzba n : narudzbePoDanu) {
                ReceptDTO receptDTO = receptService.getOne(n.getIdRecepta());
                double trosak = receptDTO.getTrosakIzrade();

                if("Srednja".equals(n.getVelicina())){
                    trosak*=1.5;
                } else if ("Velika".equals(n.getVelicina())){
                    trosak*=2;
                }

                zarada+=(n.getCijena()-trosak);
            }

            zarade.add(new Zarada(dan,zarada));
        }

        return zarade;
    }
}
