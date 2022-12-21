package sarlota.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import sarlota.entities.enums.Role;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Zaposleni implements UserDetails {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id@Column(name = "id")
    private Integer id;
    @Basic@Column(name = "ime")
    private String ime;
    @Basic@Column(name = "prezime")
    private String prezime;
    @Basic@Column(name = "korisnicko_ime")
    private String korisnickoIme;
    @Basic@Column(name = "lozinka")
    @JsonIgnore
    private String lozinka;
    @Basic@Column(name = "plata")
    private BigDecimal plata;
    @Enumerated(EnumType.ORDINAL)
    @Column(name = "tip_zaposlenog", nullable = false)
    private Role role;
    @JsonIgnore
    @OneToMany(mappedBy = "zaposleniByZaposleniId")
    private List<Kontakt> kontaktsById;
    @JsonIgnore
    @OneToMany(mappedBy = "zaposleniByZaposleniId")
    private List<Narudzba> narudzbasById;
    @JsonIgnore
    @OneToMany(mappedBy = "zaposleniByZaposleniId")
    private List<Recept> receptsById;
    @JsonIgnore
    @OneToMany(mappedBy = "zaposleniByZaposleniId")
    private List<Zaduzenje> zaduzenjesById;



    public Zaposleni(String username, String firstName, String lastName, String password, BigDecimal plata, Role tipZaposlenog) {
        this.korisnickoIme = username;
        this.ime = firstName;
        this.prezime = lastName;
        this.plata = plata;
        this.lozinka = password;
        this.role = tipZaposlenog;
    }

    public Zaposleni(Integer id, String username, String password, Role role) {
        this.id = id;
        this.korisnickoIme = username;
        this.lozinka = password;
        this.role = role;
    }


    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return lozinka;
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return korisnickoIme;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }
}
