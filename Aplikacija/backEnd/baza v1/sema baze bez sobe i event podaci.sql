-- -----------------------------------------------------
-- Table `softversko`.`KORISNIK`
-- -----------------------------------------------------

INSERT INTO `softversko`.`korisnik`
(`username`, `password`, `email`, `ime`, `prezime`, `poeni`, `index`, `tip`) VALUES 
('petar', '12345678', 'petar.petrovic@gmail.com', 'Petar', 'Petrović', 5, '16112', 'obican');
INSERT INTO `softversko`.`korisnik`
(`username`, `password`, `email`, `ime`, `prezime`, `poeni`, `index`, `tip`) VALUES 
('marko', 'ferari', 'marko@gmail.com', 'Markor', 'Marković', 10, '14523', 'obican');
INSERT INTO `softversko`.`korisnik`
(`username`, `password`, `email`, `ime`, `prezime`, `poeni`, `index`, `tip`) VALUES 
('batabane', 'pekarica', 'batabane@gmail.com', 'Branislav', 'Cvetkovic', 5, '12654', 'obican');
INSERT INTO `softversko`.`korisnik`
(`username`, `password`, `email`, `ime`, `prezime`, `poeni`, `index`, `tip`) VALUES 
('milance', 'zvezda', 'milan.jovic@gmail.com', 'Milan', 'Jovic', 2, '16364', 'obican');
INSERT INTO `softversko`.`korisnik`
(`username`, `password`, `email`, `ime`, `prezime`, `poeni`, `index`, `tip`) VALUES 
('dakica', 'crvenkapa', 'dakica@gmail.com', 'Darjana', 'Milenovic', 15, '16100', 'obican');
INSERT INTO `softversko`.`korisnik`
(`username`, `password`, `email`, `ime`, `prezime`, `poeni`, `index`, `tip`) VALUES 
('makica', 'loreal', 'makica@gmail.com', 'Marija', 'Grozdanovic', 0, '16504', 'obican');
INSERT INTO `softversko`.`korisnik`
(`username`, `password`, `email`, `ime`, `prezime`, `poeni`, `index`, `tip`) VALUES 
('mokica', 'loreal', 'mokica@gmail.com', 'Monika', 'Pesic', 25, '16604', 'obican');
INSERT INTO `softversko`.`korisnik`
(`username`, `password`, `email`, `ime`, `prezime`, `poeni`, `index`, `tip`) VALUES 
('darko', 'mercedes', 'darko@gmail.com', 'Darko', 'Peric', 48, '16000', 'obican');
INSERT INTO `softversko`.`korisnik`
(`username`, `password`, `email`, `ime`, `prezime`, `poeni`, `index`, `tip`) VALUES 
('zeljko', 'softversko', 'zeljko@gmail.com', 'Zeljko', 'Mitrovic', 50, '15954', 'moderator');
INSERT INTO `softversko`.`korisnik`
(`username`, `password`, `email`, `ime`, `prezime`, `poeni`, `index`, `tip`) VALUES 
('necika', 'necika', 'gknikolic@gmail.com', 'Nemanja', 'Nikolic', 50, '16259', 'moderator');
INSERT INTO `softversko`.`korisnik`
(`username`, `password`, `email`, `ime`, `prezime`, `poeni`, `index`, `tip`) VALUES 
('darjan', 'grobari', 'darjan@gmail.com', 'Darjan', 'Drugarinovic', 5, '16200', 'admin');

-- -----------------------------------------------------
-- Table `softversko`.`PREDMET`
-- -----------------------------------------------------

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Softversko inzinjerstvo', 'rii', 3);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Matematika 1', null, 1);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Web programiranje', 'rii', 3);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Digitalna elektronika', 'rii', 2);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Osnove telekomunikacije', 'telekomunikacije', 2);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Elektronske komponente', null, 1);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Elektronika 1', 'telekomunikacije', 2);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Racunaski sistemi', 'rii', 2);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Distribuirani sistemi', 'rii', 3);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Logicko projektovanje', 'rii', 2);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Matematika 2', null, 1);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Fizika', null, 1);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Osnove elektrotehnike 1', null, 1);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Osnove elektrotehnike 2', null, 1);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Algoritmi i programiranje', null, 1);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Uvod u računarstvo', null, 1);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Arhitektura i organizacija računara', 'rii', 2);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Objektno orijentisano programiranje', 'rii', 2);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Baze podataka', 'rii', 2);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Strukture podataka', 'rii', 2);

INSERT INTO `softversko`.`predmet`
(`naziv`, `smer`, `godina`) VALUES
('Diskretna matematika', 'rii', 2);

-- -----------------------------------------------------
-- Table `softversko`.`NASTAVNIK`
-- -----------------------------------------------------

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('1', 'Petar', 'Rajković');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('2', 'Vladan', 'Mihajlović');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('3', 'Lidija', 'Rančić');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('4', 'Igor', 'Antolović');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('5', 'Valentina', 'Nejković');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('6', 'Milos', 'Radmanović');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('7', 'Dejan', 'Rančić');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('8', 'Dragan', 'Janković');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('9', 'Nebojša', 'Raičević');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('10', 'Dragan', 'Stankovic');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('11', 'Emina', 'Milovinovic');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('12', 'Igor', 'Milovanović');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('13', 'Milena', 'Stanković');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('14', 'Vlada', 'Simić');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('15', 'Vladan', 'Nikolić');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('16', 'Dragan', 'Manić');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('17', 'Aleksandar', 'Milenković');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('18', 'Aleksandar', 'Veljanovski');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('19', 'Marija', 'Veljanovski');

INSERT INTO `softversko`.`nastavnik`
(`id`, `ime`, `prezime`) VALUES
('20', 'Goran', 'Ristić');

-- -----------------------------------------------------
-- Table `softversko`.`OCENA`
-- -----------------------------------------------------
INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9.8, 1);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(6.9, 1);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(7.9, 1);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(7, 1);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(10, 1);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8.2, 1);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(6.9, 2);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(7.1, 2);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(10, 2);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9.9, 2);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(6.9, 2);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8.9, 2);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8.9, 3);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(1, 3);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(5, 3);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(6.9, 3);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(10, 4);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8.9, 4);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9.7, 4);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8.9, 4);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(10, 4);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(1, 5);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(2, 5);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(1, 5);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(5.5, 5);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(7.9, 5);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(1, 6);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(1, 6);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8, 6);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(4, 6);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(7.2, 6);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(4.9, 6);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9, 7);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8, 7);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8.5, 7);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(7, 7);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(3, 8);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(6, 8);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(4, 8);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(4, 8);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(1, 8);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8, 9);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8, 9);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8, 9);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9, 9);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9.5, 9);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(2, 9);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(2.56, 9);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8, 10);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8, 10);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(7, 10);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9, 10);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(2, 10);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8, 11);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(4, 11);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8, 12);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8, 12);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(5, 12);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9, 12);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(3.6, 13);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(6, 13);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9, 13);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(7.1, 13);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(3.6, 14);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(3.6, 14);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8.2, 14);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9, 14);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(7, 14);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(10, 14);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(3.6, 15);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(10, 15);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(6, 15);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(3, 15);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(3.6, 15);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(3.6, 16);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(6.9, 16);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(7, 16);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9.8, 16);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(3.7, 16);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(6.78, 16);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9, 16);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9, 17);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(6, 17);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9, 17);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9, 17);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9, 17);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9, 17);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9, 18);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(10, 18);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8, 18);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(10, 18);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(7.98, 18);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(7.45, 18);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9, 19);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(9, 19);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(6, 19);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(7, 19);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(3.6, 19);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(4, 19);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8.7, 19);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(8.7, 20);

INSERT INTO `softversko`.`ocena`
(`ocena`, `NASTAVNIK_id`) VALUES
(10, 20);

-- -----------------------------------------------------
-- Table `softversko`.`PREDAJE`
-- -----------------------------------------------------

INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(28, 2, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(28, 4, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(28, 7, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(29, 15, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(29, 3, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(30, 1, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(30, 19, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(31, 16, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(31, 5, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(32, 9, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(32, 9, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(32, 6, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(33, 16, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(33, 9, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(34, 9, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(34, 9, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(34, 15, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(35, 11, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(35, 17, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(35, 14, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(36, 11, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(36, 14, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(36, 18, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(37, 6, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(37, 6, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(38, 3, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(38, 3, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(38, 15, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(39, 20, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(39, 15, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(40, 9, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(40, 15, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(41, 9, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(41, 15, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(42, 8, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(42, 7, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(42, 18, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(42, 1, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(43, 5, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(43, 6, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(44, 11, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(44, 17, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(44, 14, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(45, 8, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(45, 2, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(45, 1, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(46, 8, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(46, 19, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(46, 10, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(47, 10, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(47, 2, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(48, 4, 1);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(48, 4, 2);
INSERT INTO `softversko`.`predaje`
(`PREDMET_id`, `NASTAVNIK_id`, `fprofesor/fasistent`) VALUES
(48, 3, 2);

-- -----------------------------------------------------
-- Table `softversko`.`OCENA`
-- -----------------------------------------------------



-- -----------------------------------------------------
-- Table `softversko`.`OCENA`
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `softversko`.`PRILOG`
-- -----------------------------------------------------
