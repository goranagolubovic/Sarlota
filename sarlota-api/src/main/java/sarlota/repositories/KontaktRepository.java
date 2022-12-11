package sarlota.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sarlota.entities.Kontakt;

public interface KontaktRepository extends JpaRepository<Kontakt, Integer> {
}
