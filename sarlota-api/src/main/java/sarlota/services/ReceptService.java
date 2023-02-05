package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;
import sarlota.entities.*;
import sarlota.entities.dto.NamirnicaDTO;
import sarlota.entities.dto.NamirnicaUReceptuDTO;
import sarlota.entities.dto.ReceptDTO;
import sarlota.repositories.*;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReceptService {

    private final ReceptRepository receptRepository;

    private final NamirnicaRepository namirnicaRepository;
    private  final NamirnicaUReceptuRepository namirnicaUReceptuRepository;

    private final ZaposleniRepository zaposleniRepository;

     private final PonudaRepository ponudaRepository;

    public List<Recept> getAll() {
        return receptRepository.findAll();
    }

    public ReceptDTO getOne(int id) {
        Recept recept = receptRepository.findById(id).orElse(null);
        List<NamirnicaUReceptu> namirniceUreceptu = namirnicaUReceptuRepository.findByIdRecepta(recept.getId());

        double trosakIzrade = 0;

        List<NamirnicaUReceptuDTO> sastojci = new ArrayList<>();

        for(NamirnicaUReceptu namirnica : namirniceUreceptu) {
            Namirnica n = namirnicaRepository.findById(namirnica.getIdNamirnice()).get();
            double cijena = n.getCijenaPoJedinici() * namirnica.getKolicina();
            trosakIzrade+=cijena;
            sastojci.add(new NamirnicaUReceptuDTO(n,namirnica.getKolicina(),cijena));
        }

        ReceptDTO result = new ReceptDTO(recept,sastojci,trosakIzrade);
        return result;
    }

    public Recept add(Recept receptDTO) {
        Recept recept = new Recept(
                receptDTO.getPriprema(),
                receptDTO.getSastojci(),
                receptDTO.getNaslov(),
                receptDTO.getFotografija(),
                false,
                null
        );
        return receptRepository.save(recept);
    }

    public Recept toggleFavorite(int id) {
        Recept r = receptRepository.findById(id).orElse(null);
        if(r == null) return null;

        r.setOmiljeni(!r.getOmiljeni());
        receptRepository.save(r);
        return r;
    }

    public Recept update(int id, ReceptDTO receptDTO) {
        Recept r = receptRepository.findById(id).orElse(null);
        if (r == null) {
            return null;
        }
        r.setNaslov(receptDTO.getRecept().getNaslov());
        r.setPriprema(receptDTO.getRecept().getPriprema());
        r.setSastojci(receptDTO.getRecept().getSastojci());
        r.setFotografija(receptDTO.getRecept().getFotografija());
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
