-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema softversko
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema softversko
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `softversko` DEFAULT CHARACTER SET utf8 ;
USE `softversko` ;

-- -----------------------------------------------------
-- Table `softversko`.`KORISNIK`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softversko`.`KORISNIK` (
  `username` VARCHAR(15) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `ime` VARCHAR(22) NOT NULL,
  `prezime` VARCHAR(22) NOT NULL,
  `poeni` INT UNSIGNED NOT NULL DEFAULT 0,
  `index` VARCHAR(5) NOT NULL,
  `tip` VARCHAR(9) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE INDEX `index_UNIQUE` (`index` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softversko`.`PREDMET`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softversko`.`PREDMET` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `naziv` VARCHAR(45) NOT NULL,
  `smer` VARCHAR(25),
  `godina` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `naziv_UNIQUE` (`naziv` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softversko`.`MATERIJAL`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softversko`.`MATERIJAL` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `naslov` VARCHAR(45) NOT NULL,
  `broj_lajkova` INT NOT NULL,
  `datum` DATETIME NOT NULL,
  `tekst` MEDIUMTEXT NULL,
  `fblanket` TINYINT NOT NULL,
  `rok` DATE NULL,
  `KORISNIK_username` VARCHAR(15) NOT NULL,
  `PREDMET_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_MATERIJAL_KORISNIK1_idx` (`KORISNIK_username` ASC),
  INDEX `fk_MATERIJAL_PREDMET1_idx` (`PREDMET_id` ASC),
  CONSTRAINT `fk_MATERIJAL_KORISNIK1`
    FOREIGN KEY (`KORISNIK_username`)
    REFERENCES `softversko`.`KORISNIK` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_MATERIJAL_PREDMET1`
    FOREIGN KEY (`PREDMET_id`)
    REFERENCES `softversko`.`PREDMET` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softversko`.`KOMENTAR`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softversko`.`KOMENTAR` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tekst` LONGTEXT NOT NULL,
  `KORISNIK_username` VARCHAR(15) NOT NULL,
  `MATERIJAL_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_KOMENTAR_KORISNIK_idx` (`KORISNIK_username` ASC),
  INDEX `fk_KOMENTAR_MATERIJAL1_idx` (`MATERIJAL_id` ASC),
  CONSTRAINT `fk_KOMENTAR_KORISNIK`
    FOREIGN KEY (`KORISNIK_username`)
    REFERENCES `softversko`.`KORISNIK` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_KOMENTAR_MATERIJAL1`
    FOREIGN KEY (`MATERIJAL_id`)
    REFERENCES `softversko`.`MATERIJAL` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softversko`.`NASTAVNIK`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softversko`.`NASTAVNIK` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ime` VARCHAR(22) NOT NULL,
  `prezime` VARCHAR(22) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softversko`.`OCENA`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softversko`.`OCENA` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ocena` DECIMAL(5,2) NOT NULL,
  `NASTAVNIK_id` INT NOT NULL,
  PRIMARY KEY (`id`, `NASTAVNIK_id`),
  INDEX `fk_OCENA_NASTAVNIK1_idx` (`NASTAVNIK_id` ASC),
  CONSTRAINT `fk_OCENA_NASTAVNIK1`
    FOREIGN KEY (`NASTAVNIK_id`)
    REFERENCES `softversko`.`NASTAVNIK` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `softversko`.`PREDAJE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softversko`.`PREDAJE` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `PREDMET_id` INT NOT NULL,
  `NASTAVNIK_id` INT NOT NULL,
  `fprofesor/fasistent` TINYINT NOT NULL,
  INDEX `fk_PREDMET_has_NASTAVNIK_NASTAVNIK1_idx` (`NASTAVNIK_id` ASC),
  INDEX `fk_PREDMET_has_NASTAVNIK_PREDMET1_idx` (`PREDMET_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_PREDMET_has_NASTAVNIK_PREDMET1`
    FOREIGN KEY (`PREDMET_id`)
    REFERENCES `softversko`.`PREDMET` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PREDMET_has_NASTAVNIK_NASTAVNIK1`
    FOREIGN KEY (`NASTAVNIK_id`)
    REFERENCES `softversko`.`NASTAVNIK` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

-- -----------------------------------------------------
-- Table `softversko`.`PRILOG`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `softversko`.`PRILOG` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `naziv` VARCHAR(45) NOT NULL,
  `stavka` MEDIUMBLOB NOT NULL,
  `MATERIJAL_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_PRILOG_MATERIJAL1_idx` (`MATERIJAL_id` ASC),
  CONSTRAINT `fk_PRILOG_MATERIJAL1`
    FOREIGN KEY (`MATERIJAL_id`)
    REFERENCES `softversko`.`MATERIJAL` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB