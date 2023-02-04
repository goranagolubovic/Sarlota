-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema db_sarlota
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `db_sarlota` ;

-- -----------------------------------------------------
-- Schema db_sarlota
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_sarlota` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `db_sarlota` ;

-- -----------------------------------------------------
-- Table `db_sarlota`.`kontakt`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`kontakt` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ime` VARCHAR(45) NULL,
  `prezime` VARCHAR(45) NULL,
  `broj_telefona` VARCHAR(20) NULL,
  `link_profila` VARCHAR(50) NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `db_sarlota`.`zaposleni`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`zaposleni` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ime` VARCHAR(45) NULL,
  `prezime` VARCHAR(45) NULL,
  `korisnicko_ime` VARCHAR(45) NULL,
  `lozinka` VARCHAR(90) NULL,
  `plata` FLOAT NULL,
  `tip_zaposlenog` TINYINT NOT NULL,
  `fotografija` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `db_sarlota`.`narudzba`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`narudzba` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `datum_prijema` DATETIME NULL,
  `datum_isporuke` DATETIME NULL,
  `broj_komada` INT NULL DEFAULT NULL,
  `napomene` VARCHAR(255) NULL DEFAULT NULL,
  `naziv` VARCHAR(64) NULL DEFAULT NULL,
  `slika` MEDIUMTEXT NULL DEFAULT NULL,
  `kontakt` VARCHAR(20) NULL DEFAULT NULL,
  `adresa` VARCHAR(100) NULL DEFAULT NULL,
  `ime_narucioca` VARCHAR(100) NULL DEFAULT NULL,
  `aktivna` TINYINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `db_sarlota`.`ponuda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`ponuda` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `naziv` VARCHAR(45) NULL,
  `opis` VARCHAR(200) NULL DEFAULT NULL,
  `cijena` DECIMAL(6,2) NULL,
  `trenutno_raspolozivo` INT NULL,
  `tezina` VARCHAR(10) NULL,
  `slika` MEDIUMTEXT NULL,
  `tip_proizvoda` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `db_sarlota`.`zaduzenje`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`zaduzenje` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `naslov` VARCHAR(64) NULL,
  `opis` VARCHAR(512) NULL,
  `rok_za_izvrsenje` DATE NULL,
  `status` TINYINT NULL,
  `zaposleni_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_zaduzenje_zaposleni1_idx` (`zaposleni_id` ASC) VISIBLE,
  CONSTRAINT `fk_zaduzenje_zaposleni1`
    FOREIGN KEY (`zaposleni_id`)
    REFERENCES `db_sarlota`.`zaposleni` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `db_sarlota`.`recept`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`recept` (
  `naslov` VARCHAR(64) NULL,
  `priprema` VARCHAR(512) NULL,
  `sastojci` VARCHAR(256) NULL,
  `omiljeni` TINYINT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  `fotografija` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `db_sarlota`.`proizvod`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`proizvod` (
  `narudzba_id` INT NOT NULL,
  `ponuda_id` INT NOT NULL,
  `kolicina` INT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  INDEX `fk_narudzba_has_ponuda_ponuda1_idx` (`ponuda_id` ASC) VISIBLE,
  INDEX `fk_narudzba_has_ponuda_narudzba1_idx` (`narudzba_id` ASC) VISIBLE,
  CONSTRAINT `fk_narudzba_has_ponuda_narudzba1`
    FOREIGN KEY (`narudzba_id`)
    REFERENCES `db_sarlota`.`narudzba` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_narudzba_has_ponuda_ponuda1`
    FOREIGN KEY (`ponuda_id`)
    REFERENCES `db_sarlota`.`ponuda` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



