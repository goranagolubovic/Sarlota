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
CREATE SCHEMA IF NOT EXISTS `db_sarlota` ;
USE `db_sarlota` ;

-- -----------------------------------------------------
-- Table `db_sarlota`.`kontakt`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`kontakt` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ime` VARCHAR(45) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `prezime` VARCHAR(45) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `broj_telefona` VARCHAR(20) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `link_profila` VARCHAR(50) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `email` VARCHAR(50) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2;


-- -----------------------------------------------------
-- Table `db_sarlota`.`narudzba`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`narudzba` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `datum_prijema` DATETIME NULL DEFAULT NULL,
  `datum_isporuke` DATETIME NULL DEFAULT NULL,
  `broj_komada` INT NULL DEFAULT NULL,
  `napomene` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `naziv` VARCHAR(64) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `slika` MEDIUMTEXT COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `kontakt` VARCHAR(20) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `adresa` VARCHAR(100) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `ime_narucioca` VARCHAR(100) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `aktivna` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4;


-- -----------------------------------------------------
-- Table `db_sarlota`.`ponuda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`ponuda` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `naziv` VARCHAR(45) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `opis` VARCHAR(200) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `cijena` DECIMAL(6,2) NULL DEFAULT NULL,
  `trenutno_raspolozivo` INT NULL DEFAULT NULL,
  `tezina` VARCHAR(10) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `slika` MEDIUMTEXT COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `tip_proizvoda` VARCHAR(32) COLLATE 'utf8mb3_unicode_ci' NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2;


-- -----------------------------------------------------
-- Table `db_sarlota`.`proizvod`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`proizvod` (
  `narudzba_id` INT NOT NULL,
  `ponuda_id` INT NOT NULL,
  `kolicina` INT NULL DEFAULT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  INDEX `fk_narudzba_has_ponuda_ponuda1_idx` (`ponuda_id` ASC) VISIBLE,
  INDEX `fk_narudzba_has_ponuda_narudzba1_idx` (`narudzba_id` ASC) VISIBLE,
  CONSTRAINT `fk_narudzba_has_ponuda_narudzba1`
    FOREIGN KEY (`narudzba_id`)
    REFERENCES `db_sarlota`.`narudzba` (`id`),
  CONSTRAINT `fk_narudzba_has_ponuda_ponuda1`
    FOREIGN KEY (`ponuda_id`)
    REFERENCES `db_sarlota`.`ponuda` (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_sarlota`.`recept`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`recept` (
  `naslov` VARCHAR(64) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `priprema` VARCHAR(512) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `sastojci` VARCHAR(256) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `omiljeni` TINYINT NULL DEFAULT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  `fotografija` MEDIUMTEXT COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3;


-- -----------------------------------------------------
-- Table `db_sarlota`.`zaposleni`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`zaposleni` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ime` VARCHAR(45) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `prezime` VARCHAR(45) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `korisnicko_ime` VARCHAR(45) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `lozinka` VARCHAR(90) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `plata` FLOAT NULL DEFAULT NULL,
  `tip_zaposlenog` TINYINT NOT NULL,
  `fotografija` MEDIUMTEXT COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 124;


-- -----------------------------------------------------
-- Table `db_sarlota`.`zaduzenje`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`zaduzenje` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `naslov` VARCHAR(64) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `opis` VARCHAR(512) COLLATE 'utf8mb3_unicode_ci' NULL DEFAULT NULL,
  `rok_za_izvrsenje` DATE NULL DEFAULT NULL,
  `status` TINYINT NULL DEFAULT NULL,
  `zaposleni_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_zaduzenje_zaposleni1_idx` (`zaposleni_id` ASC) VISIBLE,
  CONSTRAINT `fk_zaduzenje_zaposleni1`
    FOREIGN KEY (`zaposleni_id`)
    REFERENCES `db_sarlota`.`zaposleni` (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_sarlota`.`namirnica`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`namirnica` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `naziv` VARCHAR(45) NOT NULL,
  `cijena_po_jedinici` DECIMAL(6,2) NOT NULL,
  `jedinica` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_sarlota`.`nabavka`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`nabavka` (
  `id` INT NOT NULL,
  `datum` DATE NULL,
  `cijena` DOUBLE(6,2) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_sarlota`.`nabavka_namirnice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`nabavka_namirnice` (
  `nabavka_id` INT NOT NULL,
  `namirnica_id` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  `kolicina` DECIMAL(6,2) NOT NULL,
  INDEX `fk_nabavka_has_namirnica_namirnica1_idx` (`namirnica_id` ASC) VISIBLE,
  INDEX `fk_nabavka_has_namirnica_nabavka1_idx` (`nabavka_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_nabavka_has_namirnica_nabavka1`
    FOREIGN KEY (`nabavka_id`)
    REFERENCES `db_sarlota`.`nabavka` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_nabavka_has_namirnica_namirnica1`
    FOREIGN KEY (`namirnica_id`)
    REFERENCES `db_sarlota`.`namirnica` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_sarlota`.`namirnica_u_receptu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_sarlota`.`namirnica_u_receptu` (
  `recept_id` INT NOT NULL,
  `namirnica_id` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  `kolicina` DECIMAL(6,2) NOT NULL,
  INDEX `fk_recept_has_namirnica_namirnica1_idx` (`namirnica_id` ASC) VISIBLE,
  INDEX `fk_recept_has_namirnica_recept1_idx` (`recept_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_recept_has_namirnica_recept1`
    FOREIGN KEY (`recept_id`)
    REFERENCES `db_sarlota`.`recept` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_recept_has_namirnica_namirnica1`
    FOREIGN KEY (`namirnica_id`)
    REFERENCES `db_sarlota`.`namirnica` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
