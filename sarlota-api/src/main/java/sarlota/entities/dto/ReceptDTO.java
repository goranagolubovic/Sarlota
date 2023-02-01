package sarlota.entities.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceptDTO {
    private String priprema;
    private String sastojci;
    private String naslov;
    private String fotografija;
}
