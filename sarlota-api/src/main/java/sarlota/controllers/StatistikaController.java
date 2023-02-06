package sarlota.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sarlota.entities.dto.Potrosnja;
import sarlota.entities.dto.Zarada;
import sarlota.services.NabavkaService;
import sarlota.services.NarudzbaService;
import sarlota.services.StatistikaService;

import java.math.BigDecimal;
import java.nio.DoubleBuffer;
import java.util.List;

@RestController
@RequestMapping("api/v1/statistika")
@RequiredArgsConstructor
public class StatistikaController {

    private final NarudzbaService narudzbaService;
    private final StatistikaService statistikaService;


    @GetMapping("/brojNarudzbi")
    ResponseEntity<Integer> count(@RequestParam(value = "query") String keyword) {
        try{
            int brojDana = Integer.parseInt(keyword);
            if(brojDana < 1) throw new Exception();
            return ResponseEntity.ok(narudzbaService.count(brojDana));
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/ukupnaZarada")
    ResponseEntity<Double> profit(){
        try{
            return ResponseEntity.ok(statistikaService.profit());
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/zarada")
    ResponseEntity<List<Zarada>> profitLastNDays(@RequestParam(value = "query") String keyword){
        try{
            int brojDana = Integer.parseInt(keyword);
            if(brojDana < 1) throw new Exception();
            return ResponseEntity.ok(statistikaService.profitLastNDays(brojDana));
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/potrosnja")
    ResponseEntity<List<Potrosnja>> potrosnja(@RequestParam(value = "query") String keyword){
        try{
            int brojDana = Integer.parseInt(keyword);
            if(brojDana < 1) throw new Exception();
            return ResponseEntity.ok(statistikaService.expensesLastNDays(brojDana));
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }


}
