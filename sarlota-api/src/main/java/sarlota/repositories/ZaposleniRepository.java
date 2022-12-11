package sarlota.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sarlota.entities.Zaposleni;

public interface ZaposleniRepository extends JpaRepository<Zaposleni, Integer> {
}
