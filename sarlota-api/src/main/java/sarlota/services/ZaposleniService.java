package sarlota.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sarlota.entities.Zaposleni;
import sarlota.entities.dto.ZaposleniDTO;
import sarlota.entities.enums.Role;
import sarlota.entities.requests.SignUpRequest;
import sarlota.entities.requests.ZaposleniUpdateRequest;
import sarlota.repositories.ZaposleniRepository;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ZaposleniService {

    private final ZaposleniRepository zaposleniRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${authorization.default.username}")
    private String defaultUsername;
    @Value("${authorization.default.last-name}")
    private String defaultFirstName;
    @Value("${authorization.default.first-name}")
    private String defaultLastName;
    @Value("${authorization.default.password}")
    private String defaultPassword;

    @Value("${authorization.default.salary}")
    private BigDecimal defaultPlata;

    public List<Zaposleni> getAll() {

        return zaposleniRepository.findAll();
    }

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

    public Zaposleni update(int id, ZaposleniUpdateRequest request) throws Exception{
        Zaposleni z = zaposleniRepository.findById(id).orElse(null);
        if(z == null){
            return null;
        }
        if(zaposleniRepository.findByUsername(z.getUsername()) != null  && z.getId() != id){
            throw new Exception();
        }
        z.setIme(request.getIme());
        z.setPrezime(request.getPrezime());
        z.setKorisnickoIme(request.getKorisnickoIme());
        z.setPlata(request.getPlata());
        //z.setLozinka(request.getLozinka());
        z.setRole(request.getTipZaposlenog());
        return zaposleniRepository.save(z);
    }

    public void delete(int id) throws Exception{
        if(zaposleniRepository.count() == 1) throw new Exception();
        zaposleniRepository.deleteById(id);
    }

    public void signUp(SignUpRequest request){
        if(zaposleniRepository.findByUsername(request.getKorisnickoIme()) != null){
            return;
        }
        Zaposleni z = new Zaposleni(request.getKorisnickoIme(), request.getIme(), request.getPrezime(), request.getLozinka(),new BigDecimal(1500), request.getTipZaposlenog());
        z.setLozinka(passwordEncoder.encode(z.getLozinka()));
        z.setRole(request.getTipZaposlenog());
        add(new ZaposleniDTO(z.getIme(), z.getPrezime(), z.getKorisnickoIme(), z.getLozinka(), z.getPlata() , z.getRole()));
    }

    @PostConstruct
    public void postConstruct(){
        if(zaposleniRepository.count() == 0){
            Zaposleni zaposleni = new Zaposleni();
            zaposleni.setKorisnickoIme(defaultUsername);
            zaposleni.setIme(defaultFirstName);
            zaposleni.setPrezime(defaultLastName);
            zaposleni.setPlata(defaultPlata);
            zaposleni.setLozinka(passwordEncoder.encode(defaultPassword));
            zaposleni.setRole(Role.POSLASTICAR);
            zaposleniRepository.saveAndFlush(zaposleni);
        }
    }

}
