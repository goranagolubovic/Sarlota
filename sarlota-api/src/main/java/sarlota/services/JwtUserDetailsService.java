package sarlota.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import sarlota.entities.Zaposleni;
import sarlota.repositories.ZaposleniRepository;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final ZaposleniRepository zaposleniRepository;

    public JwtUserDetailsService(ZaposleniRepository zaposleniRepository) {
        this.zaposleniRepository = zaposleniRepository;
    }


    @Override
    public Zaposleni loadUserByUsername(String username) throws UsernameNotFoundException {
        Zaposleni z = zaposleniRepository.findByUsername(username);
        if(z == null) throw new UsernameNotFoundException(username);
        return z;
    }
}
