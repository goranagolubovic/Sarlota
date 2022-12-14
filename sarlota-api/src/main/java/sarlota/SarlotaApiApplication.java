package sarlota;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

//========================================================
// DODAN 'exclude' SAMO RADI TESTIRANJA
//========================================================
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class SarlotaApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SarlotaApiApplication.class, args);
	}

}
