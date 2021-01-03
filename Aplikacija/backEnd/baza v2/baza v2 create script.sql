-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema softversko_v2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema softversko_v2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `softversko_v2` DEFAULT CHARACTER SET utf8 ;
USE `softversko_v2` ;

-- -----------------------------------------------------
-- Table `softversko_v2`.`KORISNIK`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softversko_v2`.`KORISNIK` (
  `username` VARCHAR(15) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `ime` VARCHAR(22) NOT NULL,
  `prezime` VARCHAR(22) NOT NULL,
  `poeni` INT UNSIGNED NOT NULL DEFAULT 0,
  `indeks` VARCHAR(5) NOT NULL,
  `tip` VARCHAR(9) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE INDEX `index_UNIQUE` (`indeks` ASC))
ENGINE = InnoDB


-- -----------------------------------------------------
-- Table `softversko_v2`.`PREDMET`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softversko_v2`.`PREDMET` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `naziv` VARCHAR(45) NOT NULL,
  `smer` VARCHAR(25) NULL,
  `godina` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `naziv_UNIQUE` (`naziv` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softversko_v2`.`MATERIJAL`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softversko_v2`.`MATERIJAL` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `naslov` VARCHAR(200) NOT NULL,
  `broj_lajkova` INT NOT NULL DEFAULT 0,
  `datum` DATETIME NOT NULL,
  `tekst` MEDIUMTEXT NULL,
  `fblanket` TINYINT(1) NOT NULL,
  `rok` VARCHAR(15) NULL,
  `broj_pitanja` INT NULL DEFAULT NULL,
  `KORISNIK_username` VARCHAR(15) NOT NULL,
  `PREDMET_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_MATERIJAL_KORISNIK1_idx` (`KORISNIK_username` ASC),
  INDEX `fk_MATERIJAL_PREDMET1_idx` (`PREDMET_id` ASC),
  CONSTRAINT `fk_MATERIJAL_KORISNIK1`
    FOREIGN KEY (`KORISNIK_username`)
    REFERENCES `softversko_v2`.`KORISNIK` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_MATERIJAL_PREDMET1`
    FOREIGN KEY (`PREDMET_id`)
    REFERENCES `softversko_v2`.`PREDMET` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softversko_v2`.`KOMENTAR`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softversko_v2`.`KOMENTAR` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tekst` LONGTEXT NOT NULL,
  `broj_lajkova` INT NOT NULL DEFAULT 0,
  `KORISNIK_username` VARCHAR(15) NOT NULL,
  `MATERIJAL_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_KOMENTAR_KORISNIK_idx` (`KORISNIK_username` ASC),
  INDEX `fk_KOMENTAR_MATERIJAL1_idx` (`MATERIJAL_id` ASC),
  CONSTRAINT `fk_KOMENTAR_KORISNIK`
    FOREIGN KEY (`KORISNIK_username`)
    REFERENCES `softversko_v2`.`KORISNIK` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_KOMENTAR_MATERIJAL1`
    FOREIGN KEY (`MATERIJAL_id`)
    REFERENCES `softversko_v2`.`MATERIJAL` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softversko_v2`.`NASTAVNIK`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softversko_v2`.`NASTAVNIK` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ime` VARCHAR(22) NOT NULL,
  `prezime` VARCHAR(22) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softversko_v2`.`PREDAJE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softversko_v2`.`predaje` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `ocena_zbir` INT NULL DEFAULT 0,
  `ocena_count` INT NULL DEFAULT 0,
  `fprofesor/fasistent` TINYINT(4) NOT NULL,
  `PREDMET_id` INT(11) NOT NULL,
  `NASTAVNIK_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_PREDMET_has_NASTAVNIK_NASTAVNIK1_idx` (`NASTAVNIK_id` ASC),
  INDEX `fk_PREDMET_has_NASTAVNIK_PREDMET1_idx` (`PREDMET_id` ASC),
  CONSTRAINT `fk_PREDMET_has_NASTAVNIK_NASTAVNIK1`
    FOREIGN KEY (`NASTAVNIK_id`)
    REFERENCES `softversko_v2`.`nastavnik` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PREDMET_has_NASTAVNIK_PREDMET1`
    FOREIGN KEY (`PREDMET_id`)
    REFERENCES `softversko_v2`.`predmet` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 51
DEFAULT CHARACTER SET = utf8


-- -----------------------------------------------------
-- Table `softversko_v2`.`PRILOG`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softversko_v2`.`PRILOG` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `naziv` VARCHAR(45) NOT NULL,
  `stavka` MEDIUMBLOB NOT NULL,
  `je_slika` TINYINT(1) NOT NULL DEFAULT 0,
  `MATERIJAL_id` INT NULL DEFAULT NULL,
  `KOMENTAR_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_PRILOG_MATERIJAL1_idx` (`MATERIJAL_id` ASC),
  INDEX `fk_PRILOG_KOMENTAR1_idx` (`KOMENTAR_id` ASC),
  CONSTRAINT `fk_PRILOG_MATERIJAL1`
    FOREIGN KEY (`MATERIJAL_id`)
    REFERENCES `softversko_v2`.`MATERIJAL` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PRILOG_KOMENTAR1`
    FOREIGN KEY (`KOMENTAR_id`)
    REFERENCES `softversko_v2`.`KOMENTAR` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softversko_v2`.`LAJKUJE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softversko_v2`.`LAJKUJE` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `MATERIJAL_id` INT NOT NULL,
  `KORISNIK_username` VARCHAR(15) NOT NULL,
  INDEX `fk_MATERIJAL_has_KORISNIK_KORISNIK1_idx` (`KORISNIK_username` ASC),
  INDEX `fk_MATERIJAL_has_KORISNIK_MATERIJAL1_idx` (`MATERIJAL_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_MATERIJAL_has_KORISNIK_MATERIJAL1`
    FOREIGN KEY (`MATERIJAL_id`)
    REFERENCES `softversko_v2`.`MATERIJAL` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_MATERIJAL_has_KORISNIK_KORISNIK1`
    FOREIGN KEY (`KORISNIK_username`)
    REFERENCES `softversko_v2`.`KORISNIK` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softversko_v2`.`LAJKUJE_ODGOVOR`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softversko_v2`.`LAJKUJE_ODGOVOR` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `KORISNIK_username` VARCHAR(15) NOT NULL,
  `KOMENTAR_id` INT NOT NULL,
  INDEX `fk_KORISNIK_has_KOMENTAR_KOMENTAR1_idx` (`KOMENTAR_id` ASC),
  INDEX `fk_KORISNIK_has_KOMENTAR_KORISNIK1_idx` (`KORISNIK_username` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_KORISNIK_has_KOMENTAR_KORISNIK1`
    FOREIGN KEY (`KORISNIK_username`)
    REFERENCES `softversko_v2`.`KORISNIK` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_KORISNIK_has_KOMENTAR_KOMENTAR1`
    FOREIGN KEY (`KOMENTAR_id`)
    REFERENCES `softversko_v2`.`KOMENTAR` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
