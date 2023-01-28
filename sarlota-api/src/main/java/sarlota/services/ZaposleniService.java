package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.ZaposleniDTO;
import sarlota.entities.requests.SignUpRequest;
import sarlota.entities.requests.ZaposleniPasswordAndUsernameUpdateRequest;
import sarlota.entities.requests.ZaposleniUpdateRequest;
import sarlota.repositories.ZaposleniRepository;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import org.springframework.util.Base64Utils;

@Service
@RequiredArgsConstructor
public class ZaposleniService {

    private final ZaposleniRepository zaposleniRepository;
    private final PasswordEncoder passwordEncoder;

    public List<Zaposleni> getAll() {
        return zaposleniRepository.findAll();
    }



    public List<Zaposleni> search(String keyword) {
        try{
            int id = Integer.parseInt(keyword);
            Zaposleni z = zaposleniRepository.findById(id).orElse(null);
            List<Zaposleni> zaposleni = new ArrayList<Zaposleni>();
            if(z != null){
                zaposleni.add(z);
            }
            return zaposleni;
        }
        catch(NumberFormatException e){}
        return zaposleniRepository.findByKeyword("%" + keyword + "%");
    }


    public Zaposleni getOne(int id) {
        return zaposleniRepository.findById(id).orElse(null);
    }

    public Zaposleni add(ZaposleniDTO zaposleniDTO) {
        Zaposleni zaposleni = new Zaposleni(
                null,
                zaposleniDTO.getIme(),
                zaposleniDTO.getPrezime(),
                zaposleniDTO.getKorisnickoIme(),
                passwordEncoder.encode(zaposleniDTO.getLozinka()),
                zaposleniDTO.getPlata(),
                zaposleniDTO.getTipZaposlenog(),
                zaposleniDTO.getFotografija(),
                null,
                null,
                null
        );
        return zaposleniRepository.save(zaposleni);

    }

    public Zaposleni update(int id, ZaposleniUpdateRequest request) throws Exception {
        Zaposleni z = zaposleniRepository.findById(id).orElse(null);
        if (z == null) {
            return null;
        }
        z.setIme(request.getIme());
        z.setPrezime(request.getPrezime());
//        z.setKorisnickoIme(request.getKorisnickoIme());
        z.setPlata(request.getPlata());
//        z.setLozinka(passwordEncoder.encode(request.getLozinka()));

        z.setTipZaposlenog(request.getTipZaposlenog());
        z.setFotografija(Base64Utils.decodeFromString(request.getFotografija()));
        return zaposleniRepository.save(z);
    }

    public Zaposleni updatePasswordAndUsername(int id, ZaposleniPasswordAndUsernameUpdateRequest request){
        Zaposleni z = zaposleniRepository.findById(id).orElse(null);
        z.setLozinka( passwordEncoder.encode(request.getNovaLozinka()));
        z.setKorisnickoIme(request.getNovoKorisnickoIme());
        return zaposleniRepository.save(z);
    }

    public void delete(int id) throws Exception {
        if (zaposleniRepository.count() == 1) throw new Exception();
        zaposleniRepository.deleteById(id);
    }

    public void signup(SignUpRequest request) {
        if (zaposleniRepository.findByUsername(request.getKorisnickoIme()) != null) {
            return;
        }
        Zaposleni z = new Zaposleni(null, request.getKorisnickoIme(), request.getIme(), request.getPrezime(),
                passwordEncoder.encode(request.getLozinka()), new BigDecimal(0), request.getTipZaposlenog(), Base64Utils.decodeFromString(request.getFotografija()));
        zaposleniRepository.save(z);
    }

}
