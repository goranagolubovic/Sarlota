package sarlota.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sarlota.entities.Recept;

public interface ReceptRepository extends JpaRepository<Recept, Integer> {
}
