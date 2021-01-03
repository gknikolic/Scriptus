-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 08, 2019 at 08:20 PM
-- Server version: 5.7.24
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `softversko_v2`
--

-- --------------------------------------------------------

--
-- Table structure for table `forum`
--

DROP TABLE IF EXISTS `forum`;
CREATE TABLE IF NOT EXISTS `forum` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tekst` longtext NOT NULL,
  `datum` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `KORISNIK_username` varchar(15) NOT NULL,
  `PREDMET_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_FORUM_KORISNIK_idx` (`KORISNIK_username`),
  KEY `fk_FORUM_PREDMET_idx` (`PREDMET_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `komentar`
--

DROP TABLE IF EXISTS `komentar`;
CREATE TABLE IF NOT EXISTS `komentar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tekst` longtext NOT NULL,
  `broj_lajkova` int(11) NOT NULL DEFAULT '0',
  `datum` datetime NOT NULL DEFAULT '2019-06-27 17:25:12',
  `promoted` tinyint(1) NOT NULL DEFAULT '0',
  `KORISNIK_username` varchar(15) NOT NULL,
  `MATERIJAL_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_KOMENTAR_KORISNIK_idx` (`KORISNIK_username`),
  KEY `fk_KOMENTAR_MATERIJAL1_idx` (`MATERIJAL_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `komentar`
--

INSERT INTO `komentar` (`id`, `tekst`, `broj_lajkova`, `datum`, `promoted`, `KORISNIK_username`, `MATERIJAL_id`) VALUES
(1, 'Proces može da bude i skup niti koje se izvršavaju, jer niti su deo procesa. Radi se paralelizacija radi bržeg izvršavanje programa.', 2, '2019-06-27 17:25:12', 0, 'dakica', 2),
(2, 'Postoje sistemski i korisnički procesi.', 0, '2019-06-27 17:25:12', 0, 'darko', 2),
(3, 'Softversko inženjerstvo se bavi razvojem efikasnog, pouzdanog i bezbednog proizvoda u vvidu softvera.', 2, '2019-06-27 17:25:12', 1, 'darko', 1),
(4, 'softversko inženjerstvo je čvrsto vezano za upravljanje procesima i\r\nkvalitetom, za kreativnost i inovacije, za standarde, za individualne veštine pojedinaca, ali i za\r\nsposobnost timskog rada i primenu pravila i iskustva iz profesionalne prakse.\r\n', 0, '2019-06-27 17:25:12', 0, 'necika', 1),
(10, ' Kreiran od strane Rational Software Corporation, sektora IBM-a, RUP je prilagodljiv framework za razvijanje softvera. RUP-je kao online mentor koji pruža smernice, šablone i primere za razvoj programa.', 0, '2019-06-27 17:25:12', 0, 'zeljko', 8),
(12, 'Ja sam zeljko i vozim biciklu.', 0, '2019-06-27 17:25:12', 0, 'zeljko', 1),
(14, 'Procesi prilikom pisanja softvera', 0, '2019-06-27 17:25:12', 0, 'zeljko', 3),
(15, 'Procesi prilikom pisanja softvera', 0, '2019-06-27 17:25:12', 0, 'zeljko', 3),
(16, 'Procesi prilikom pisanja softvera', 0, '2019-06-27 17:25:12', 0, 'zeljko', 3),
(17, 'Procesi prilikom pisanja softvera', 0, '2019-06-27 17:25:12', 0, 'zeljko', 3),
(18, 'Proces je ', 0, '2019-06-27 17:25:12', 0, 'zeljko', 2),
(19, 'asdfa', 0, '2019-06-27 17:25:12', 0, 'zeljko', 2),
(20, 'asdfa ads a', 0, '2019-06-27 17:25:12', 0, 'zeljko', 2),
(21, 'dfa asd a asd a a', 0, '2019-06-27 17:25:12', 0, 'zeljko', 2),
(22, 'casdfa asf ads', 0, '2019-06-27 17:25:12', 0, 'zeljko', 2),
(23, 'efy wt wert ', 0, '2019-06-27 17:25:12', 0, 'zeljko', 2),
(24, 'Proces se sastoji od vise niti.', 0, '2019-06-27 17:25:12', 0, 'darjan', 2),
(26, 'probni odgovor 1', 0, '2019-06-27 17:25:12', 1, 'batabane', 1),
(35, 'Probno dodavanje', -1, '2019-06-28 22:19:18', 0, 'darjan', 1),
(36, 'asd', -3, '2019-06-28 22:58:42', 0, 'darjan', 7),
(37, '', 0, '2019-07-01 00:41:58', 0, 'darjan', 1),
(38, 'saSAsaSA', -5, '2019-07-07 02:26:11', 0, 'zeljko', 5),
(39, 'xasdsadsadsadsadsa', 0, '2019-07-07 02:26:36', 0, 'zeljko', 15),
(40, 'dsadsadsadsadsa', 0, '2019-07-07 02:52:32', 0, 'zeljko', 15),
(41, 'asdfasfsdf asdfas asdf a', 0, '2019-07-07 02:53:24', 0, 'zeljko', 15);

-- --------------------------------------------------------

--
-- Table structure for table `korisnik`
--

DROP TABLE IF EXISTS `korisnik`;
CREATE TABLE IF NOT EXISTS `korisnik` (
  `username` varchar(25) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `poeni` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `tip` varchar(9) NOT NULL,
  `ime` varchar(22) DEFAULT NULL,
  `prezime` varchar(22) DEFAULT NULL,
  `indeks` varchar(5) DEFAULT NULL,
  `kazneni_poeni` int(2) NOT NULL DEFAULT '0',
  `path` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `korisnik`
--

INSERT INTO `korisnik` (`username`, `password`, `email`, `poeni`, `tip`, `ime`, `prezime`, `indeks`, `kazneni_poeni`, `path`) VALUES
('batabane', 'sha1$8b10daa6$1$908cdd0c2d74bf1ce3707f272cdcbe6d43cd7e33', 'batabane@gmail.com', 10, 'obican', 'Branislav', 'Cvetkovic', '12654', 0, NULL),
('dakica', 'sha1$2cf7f3e4$1$874fb8c47c47ba27707821ce3b5baeaf0fc7b6df', 'dakica@gmail.com', 15, 'obican', 'Darjana', 'Milenovic', '16100', 0, NULL),
('darjan', 'sha1$f97fd834$1$1b072fb0066a204d1e9383e71f79ef67b8918259', 'darjan@gmail.com', 57, 'admin', 'Darjan', 'Drugarinovic', '16200', 0, NULL),
('darko', 'sha1$de40ffd4$1$5004c7c2836b136717d6dc8a0194ae5527c0ed8f', 'darko@gmail.com', 48, 'obican', 'Darko', 'Peric', '16000', 0, NULL),
('gknikolic', 'sha1$a7a3d5ab$1$aa331b46a5d8be0de07f707070c160741ad9b0d6', 'gknikolic@gmail.com', 0, 'obican', 'dsa', 'Nikolic', NULL, 0, NULL),
('makica', 'sha1$08c78831$1$1870bd5fb2b63f54b44b6d17ad498eba054d12df', 'makica@gmail.com', 0, 'obican', 'Marija', 'Grozdanovic', '16504', 0, NULL),
('marjan', 'sha1$02626e2e$1$cbc2094e6fd3c46d8a79b48e206a7c74a3d4b65f', 'marjan@elfak.rs', 0, 'obican', 'undefined', 'undefined', NULL, 0, NULL),
('marko', 'sha1$68ee908a$1$9077eb9b4088f842d61ff93095268d507ad00967', 'marko@gmail.com', 10, 'obican', 'Markor', 'Marković', '14523', 0, NULL),
('milance', 'sha1$fea431cf$1$036737ea77e7fe9cff445f7498103abbc09e3827', 'milan.jovic@gmail.com', 2, 'obican', 'Milan', 'Jovic', '16364', 0, NULL),
('mokica', 'sha1$f13c78a9$1$54da62e224ec338f3fe217002224aec9dd4f1d3d', 'mokica@gmail.com', 25, 'obican', 'Monika', 'Pesic', '16604', 0, NULL),
('necika', 'sha1$53833a98$1$52998201dd192e3c2da7d31a25ff75631fdaffee', 'gknikolic@gmail.com', 50, 'moderator', 'Nemanja', 'Nikolic', '16259', 0, NULL),
('petar', 'sha1$75d95306$1$dbe5da6e88f91a3671e03b35a1482b42f4939537', 'petar.petrovic@gmail.com', 5, 'obican', 'Petar', 'Petrović', '16112', 0, NULL),
('zeljko', 'sha1$fb1c82d4$1$1fe6bc18b808b43187fd6edd472d3706d56484e7', 'zeljko@gmail.com', 50, 'moderator', 'Zeljko', 'Mitrovic', '15954', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `lajkuje`
--

DROP TABLE IF EXISTS `lajkuje`;
CREATE TABLE IF NOT EXISTS `lajkuje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lajk_dislajk` tinyint(1) NOT NULL,
  `MATERIJAL_id` int(11) NOT NULL,
  `KORISNIK_username` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_MATERIJAL_has_KORISNIK_KORISNIK1_idx` (`KORISNIK_username`),
  KEY `fk_MATERIJAL_has_KORISNIK_MATERIJAL1_idx` (`MATERIJAL_id`)
) ENGINE=InnoDB AUTO_INCREMENT=409 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lajkuje`
--

INSERT INTO `lajkuje` (`id`, `lajk_dislajk`, `MATERIJAL_id`, `KORISNIK_username`) VALUES
(2, 1, 2, 'darjan'),
(71, 1, 2, 'zeljko'),
(107, -1, 26, 'batabane'),
(375, 1, 8, 'darjan'),
(376, 1, 14, 'darjan'),
(377, 1, 19, 'zeljko'),
(378, 1, 20, 'zeljko'),
(379, 1, 13, 'zeljko'),
(380, 1, 7, 'darjan'),
(386, 1, 31, 'zeljko'),
(387, 1, 30, 'zeljko'),
(388, 1, 29, 'zeljko'),
(395, 1, 1, 'darjan'),
(408, 1, 1, 'darko');

-- --------------------------------------------------------

--
-- Table structure for table `lajkuje_odgovor`
--

DROP TABLE IF EXISTS `lajkuje_odgovor`;
CREATE TABLE IF NOT EXISTS `lajkuje_odgovor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lajk_dislajk` tinyint(1) NOT NULL,
  `KORISNIK_username` varchar(15) NOT NULL,
  `KOMENTAR_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_KORISNIK_has_KOMENTAR_KOMENTAR1_idx` (`KOMENTAR_id`),
  KEY `fk_KORISNIK_has_KOMENTAR_KORISNIK1_idx` (`KORISNIK_username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lajkuje_odgovor`
--

INSERT INTO `lajkuje_odgovor` (`id`, `lajk_dislajk`, `KORISNIK_username`, `KOMENTAR_id`) VALUES
(2, 1, 'makica', 1),
(3, 1, 'batabane', 1),
(5, 1, 'necika', 3),
(7, 1, 'darjan', 3);

-- --------------------------------------------------------

--
-- Table structure for table `materijal`
--

DROP TABLE IF EXISTS `materijal`;
CREATE TABLE IF NOT EXISTS `materijal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naslov` varchar(200) NOT NULL,
  `broj_lajkova` int(11) NOT NULL DEFAULT '0',
  `datum` datetime DEFAULT NULL,
  `tekst` mediumtext,
  `fblanket` tinyint(2) NOT NULL,
  `rok` varchar(30) DEFAULT NULL,
  `broj_pitanja` int(11) DEFAULT NULL,
  `KORISNIK_username` varchar(15) NOT NULL,
  `PREDMET_id` int(11) NOT NULL,
  `original` tinyint(1) NOT NULL DEFAULT '1',
  `datum_odrzavanja` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_MATERIJAL_KORISNIK1_idx` (`KORISNIK_username`),
  KEY `fk_MATERIJAL_PREDMET1_idx` (`PREDMET_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `materijal`
--

INSERT INTO `materijal` (`id`, `naslov`, `broj_lajkova`, `datum`, `tekst`, `fblanket`, `rok`, `broj_pitanja`, `KORISNIK_username`, `PREDMET_id`, `original`, `datum_odrzavanja`) VALUES
(1, 'Šta je softver i čime se bavi softversko inženjerstvo? Koje tipove softvera imamo?', 2, '2019-02-12 14:32:34', 'Softver je računarski program ili kolekcija programa sa pridruženom dokumentacijom i konfiguracionim podacima neophodnim da bi softver radio korektno. Pridruzena dokumentacija moze biti sistemska (opisuje strukturu sistema) i korisnicka (danas su sve popularniji web sajtovi za podrsku korisnicima). Konfiguracioni podaci su najcesce dati u vidu konfiguracionih fajlova.', 1, 'januar, 2018', 1, 'darjan', 28, 1, NULL),
(2, 'Šta je proces?', 2, '2019-05-13 09:36:50', 'Proces je program koji se izvršava.', 1, 'januar, 2017', 2, 'batabane', 49, 1, NULL),
(3, 'Softverski procesi su?', 0, '2018-05-12 09:36:50', 'Kada se opisuju i diskutuju procesi, najčešće se govori o aktivnostima koje se sprovode u okviru procesa i\r\no nihovom redosledu. Opisi procesa takođe mogu uključiti: proizvode, koji su izlaz neke aktivnosti\r\nprocesa; role, koje označavaju odgovornosti ljudi uključenih u proces; preduslove i posledice, koje se vezuju za pojedine aktivnosti u procesu.\r\n Planom vođeni procesi su oni kod kojih se sve aktivnosti unapred planiraju, te se i progres meri na osnovu tog plana.\r\nKod agilnih procesa, planiranje je inkrementalno, pa je lakše promeniti proces nakon promene zahteva naručioca.\r\nU praksi, najpraktičniji procesi uključuju elemente oba tipa procesa. Ne postoje dobri i loši softverski procesi.\r\n', 1, 'april, 2018', 2, 'darjan', 28, 1, NULL),
(4, 'Aktivnosti u okviru procesa', 0, '2018-05-18 09:36:50', 'Kopiranje i menjanje: izmene su neizbežne u svim većim projektima. Poslovne promene dovode do pojave novih i promene postojećih zahteva. Nove tehnologije otvaraju nove mogućnosti u pogledu poboljšane implementacije sistema. Promena platforme takođe zahteva izmene u aplikaciji. Cena\r\nprepravke uključuje rad na ponovnoj analizi i specifikaciji zahteva kao i na impl.nove funkcionalnosti.\r\nSmanjenje cena je moguće izbegavanjem izmena, kada proces uključuje aktivnosti koje mogu da\r\npredvide moguće izmene pre nego što je za njih potrebn uložiti veliki trud (razviljanje prototipa, recimo). Pored toga, ako se u procesu izmene mogu sprovesti po relativno niskoj ceni (proces ima toleranciju na izmene)- zahtevaće se inkrementalni razvoj. Izmena se tada može implementirati u inkrementima koji su planirani a još nisu razvijeni, ili u novom inkrementu.\r\nUmesto isporučivanja sistema u jednom koraku, imamo podelu razvoja i isporuke u inkremente gde svaki deo isporuke sadrži deo tražene funkcionalnosti. Korisnički zahtevi se uređuju na osnovu prioriteta, tako da se najprioritetniji zahtevi rade u ranim inkrementima. Kada započne razvoj jednog inkrementa, zahtevi koji se odnose na njega se zamrzavaju dok zahtevi za buduće inkremente mogu da nastave da evoluiraju. Inkrementalni razvoj je normalni pristup koji se koristi kod agilnih metoda i evaluaciju obavlja korisnik/naručioc. Inkrementalna isporuka donosi realističniju evaluaciju praktične upotrebe softvera. Problematična je primena kod sistema koji menjaju postojeće sisteme jer polazni inkrementi nemaju sve funkcionalnosti starog sistema. Prednosti:\r\nfunkcionalnosti sistema postaju ranije dostupne korisnicima, rani inkrementi imaju ulogu prototipova kako bi se bolje razumeli zahtevi za kasnije inkremente, smanjen je rizik da projekat kompletno\r\npropadne, funkcionalnosti s najvećim prioritetom rade se u startu, pa se najviše i najbolje testiraju. Problemi: većina sistem poseduje skup osnovnih konstrukcija koje se koriste u različitim delovima sistema. Kako zahtevi nisu definisani detaljno do početka implementacije inkrementa, teško je\r\nidentifikovati zajedničke konstrukcije koje će koristiti različiti inkrementi. Pored toga, suština iterativnog procesa je da se specifikacija razvija paralelno sa softverom, ovo najčešće dolazi u konflikt s metodom nabavke kod većine organizacija gde se kompletna specifikacija sistema prilaže uz ugovor o razvoju sistema.', 1, 'jun, 2018', 2, 'darjan', 28, 1, NULL),
(5, 'Boehm-om spiralni model', 0, '2019-02-12 09:36:50', 'proces je predstavljen spiralom umesto sekvence aktivnosti s opcionim vraćanjem unazad. Svaki ciklus u spirali predstavlja jednu fazu procesa. Nema fiksnih faza poput\r\nspecifikacije ili projektovanja - ciklusi se biraju u zavisnosti od toga šta je potrebno. Na moguće rizike se obraća pažnja u toku procesa.\r\nSektori u spiralnom modelu:\r\n•	Postavljanje ciljeva - identifikacija ciljeva za datu fazu\r\n•	Procena i umanjivanje rizika - vrši se procena rizika i biraju se odgovarajuće aktivnosti kako bi se rizici smanjili\r\n•	Razvoj i validacija - bira se razvojni model sistema\r\n•	Planiranje - vrši se revizija projekta i planira se naredna faza spirale.\r\nSpiralni model pomogao je u razumevanju i prihvatanju ideje o iteracijama u softverskom procesu i ustanovljavanja rizikom vođenog prilaza u razvoju softvera. U praksi se retko koristi.\r\n\r\n', 1, 'januar, 2019', 2, 'darjan', 28, 1, NULL),
(7, 'Rational Unified Process (RUP) ', 1, '2019-03-14 06:01:30', 'modelni proces opšteg tipa zasnovan na UML-u. povezuje u sebi neka svojstva ranije pominjanih opštih modela procesa, a najčešće je opisan iz 3 perspektive: dinamičke koja prikazuje različite faze u toku vremena, statička koja prikazuje aktivnosti u procesu, i praktična koja se ogleda u korišćenju pozitivnih praktičnih iskustava.', 1, 'april, 2015', 6, 'darjan', 28, 1, NULL),
(8, 'Osnovni koncepti RUP metodologije', 1, '2018-05-13 09:36:50', '•	Faze, iteracije - kada se nešto događa?\r\n•	Tokovi procesa (aktivnosti, koraci) - šta se događa?\r\n•	Proizvodi (modeli;izveštaji, dokumenti) - šta se proizvodi?\r\n•	Učesnici (projektant, programer ) - ko to radi?\r\nSvaka faza može imati proizvoljan broj iteracija i svaka iteracija sem početne treba da rezultira izvršnom verzijom koja se može testirati. Kt-kontrolne tačke na kraju faza.\r\n', 1, 'april, 2015', 6, 'darjan', 28, 1, NULL),
(13, 'sta je softver?', 1, '2018-05-13 09:36:50', NULL, 1, 'mart, 2004', 3, 'zeljko', 28, 1, NULL),
(14, 'Odlike dobrog softvera?', 1, '2018-05-12 09:36:50', NULL, 1, 'mart, 2004', 2, 'darjan', 28, 1, NULL),
(15, 'Sa je windows?', 5, '2018-05-13 09:36:50', NULL, 1, 'kolokvijum 2, 2017', 3, 'zeljko', 49, 1, NULL),
(16, 'Sa je windows?', 0, '2018-05-13 09:36:50', NULL, 1, 'kolokvijum 2, 2017', 3, 'zeljko', 49, 0, NULL),
(18, 'Sa je windows?', 0, '2018-05-13 09:36:50', NULL, 1, 'kolokvijum 2, 2017', 3, 'zeljko', 49, 1, NULL),
(19, 'Sa je windows?', 1, '2018-05-13 09:36:50', NULL, 1, 'kolokvijum 2, 2017', 3, 'zeljko', 28, 1, NULL),
(20, 'Sa je windows?', 1, '2018-05-13 09:36:50', NULL, 1, 'kolokvijum 2, 2017', 3, 'zeljko', 28, 1, NULL),
(21, 'Sa je windows?', 0, '2018-05-13 09:36:50', NULL, 1, 'kolokvijum 2, 2017', 3, 'zeljko', 28, 1, NULL),
(22, 'Sa je windows?', 0, '2018-05-13 09:36:50', NULL, 1, 'kolokvijum 2, 2017', 3, 'zeljko', 28, 1, NULL),
(23, 'Kakav je projekat?', 0, '2018-05-13 09:36:50', NULL, 1, 'kolokvijum 2, 2017', 3, 'zeljko', 28, 1, NULL),
(24, 'Kakav je projekat?', 0, '2018-05-13 09:36:50', NULL, 1, 'kolokvijum 2, 2017', 3, 'zeljko', 28, 1, NULL),
(25, 'Kakav je projekat?', 0, '2018-05-13 09:36:50', NULL, 1, 'kolokvijum 2, 2017', 3, 'zeljko', 28, 1, NULL),
(26, 'robmno pitanje za prilog?', -1, '2019-05-13 09:36:50', NULL, 1, 'januar, 2019', 3, 'batabane', 28, 1, NULL),
(27, 'robmno pitanje za prilog?', 0, '2019-05-13 09:36:50', NULL, 1, 'januar, 2019', 3, 'batabane', 28, 1, NULL),
(28, ' bez priloga', 0, '2019-05-13 09:36:50', NULL, 1, 'januar, 2019', 3, 'batabane', 28, 1, NULL),
(29, 'Proba zadnja bez priloga', 1, '2018-05-13 09:36:50', NULL, 1, 'kolokvijum 2, 2020', 3, 'zeljko', 28, 1, NULL),
(30, 'Proba zadnja bez priloga', 1, '2018-05-13 09:36:50', NULL, 1, 'kolokvijum 2, 2020', 3, 'zeljko', 28, 1, NULL),
(31, 'Proba zadnja bez priloga', 1, '2018-05-13 09:36:50', NULL, 1, 'kolokvijum 2, 2020', 3, 'zeljko', 28, 1, NULL),
(35, 'Januar kolokvijum 1 - 2012', 0, '2019-07-07 20:37:01', NULL, 2, 'kolokvijum, 2012', NULL, 'zeljko', 49, 1, '2012-01-22'),
(36, 'Januar ispit 2015', 0, '2019-07-07 20:44:32', NULL, 2, 'januarski, 2015', NULL, 'zeljko', 49, 1, '2015-02-06'),
(38, 'Operativni skripta', 0, '2019-07-07 22:52:24', NULL, 0, NULL, NULL, 'zeljko', 49, 1, NULL),
(39, 'Operativni - invertovana tabela stranicenja', 0, '2019-07-07 22:55:23', NULL, 0, NULL, NULL, 'zeljko', 49, 1, NULL),
(40, 'test prvo', 0, '2019-07-08 00:00:00', 'Test prvo pitanje', 1, 'januar, 2018', 1, 'petar', 28, 1, NULL),
(41, 'test prvo', 0, '2019-07-08 00:00:00', 'Test prvo pitanje', 1, 'januar, 2018', 1, 'petar', 28, 1, NULL),
(44, 'dvojka', 0, '2019-07-08 00:00:00', 'asdf asdfa  lmob po e', 1, 'jun, 2016', 2, 'marko', 28, 1, NULL),
(45, 'dvojka', 0, '2019-07-08 00:00:00', 'asdf asdfa  lmob po e', 1, 'jun, 2016', 2, 'marko', 28, 1, NULL),
(46, 'Forum', 0, '2019-07-08 21:53:54', 'Probni tekst za forum', 3, NULL, NULL, 'darjan', 28, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `nastavnik`
--

DROP TABLE IF EXISTS `nastavnik`;
CREATE TABLE IF NOT EXISTS `nastavnik` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(22) NOT NULL,
  `prezime` varchar(22) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nastavnik`
--

INSERT INTO `nastavnik` (`id`, `ime`, `prezime`) VALUES
(1, 'Petar', 'Rajković'),
(2, 'Vladan', 'Mihajlović'),
(3, 'Lidija', 'Rančić'),
(4, 'Igor', 'Antolović'),
(5, 'Valentina', 'Nejković'),
(6, 'Miloš', 'Radmanović'),
(7, 'Dejan', 'Rančić'),
(8, 'Dragan', 'Janković'),
(9, 'Nebojša', 'Raičević'),
(10, 'Dragan', 'Stojanović'),
(11, 'Emina', 'Milovanović'),
(12, 'Igor', 'Milovanović'),
(13, 'Milena', 'Stanković'),
(14, 'Vladimir', 'Simić'),
(15, 'Vladan', 'Nikolić'),
(16, 'Dragan', 'Manić'),
(17, 'Aleksandar', 'Milenković'),
(18, 'Aleksandar', 'Veljanovski'),
(19, 'Marija', 'Veljanovski'),
(20, 'Goran', 'Ristić'),
(21, 'Ivan', 'Petković'),
(22, 'Bratislav', 'Predić');

-- --------------------------------------------------------

--
-- Table structure for table `predaje`
--

DROP TABLE IF EXISTS `predaje`;
CREATE TABLE IF NOT EXISTS `predaje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ocena_zbir` int(11) DEFAULT '0',
  `ocena_count` int(11) DEFAULT '0',
  `fprofesor` tinyint(1) NOT NULL,
  `PREDMET_id` int(11) NOT NULL,
  `NASTAVNIK_id` int(11) NOT NULL,
  `srednja_ocena` decimal(5,2) GENERATED ALWAYS AS (0) VIRTUAL,
  PRIMARY KEY (`id`),
  KEY `fk_PREDMET_has_NASTAVNIK_NASTAVNIK1_idx` (`NASTAVNIK_id`),
  KEY `fk_PREDMET_has_NASTAVNIK_PREDMET1_idx` (`PREDMET_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `predaje`
--

INSERT INTO `predaje` (`id`, `ocena_zbir`, `ocena_count`, `fprofesor`, `PREDMET_id`, `NASTAVNIK_id`) VALUES
(1, 111, 12, 2, 28, 2),
(2, 53, 6, 2, 28, 4),
(3, 103, 13, 1, 28, 7),
(4, 0, 0, 2, 29, 15),
(5, 0, 0, 1, 29, 3),
(6, 0, 0, 1, 30, 1),
(7, 0, 0, 2, 30, 19),
(8, 0, 0, 1, 31, 16),
(9, 0, 0, 2, 31, 5),
(10, 0, 0, 1, 32, 9),
(11, 0, 0, 2, 32, 9),
(12, 0, 0, 2, 32, 6),
(13, 0, 0, 1, 33, 16),
(14, 0, 0, 2, 33, 9),
(15, 0, 0, 1, 34, 9),
(16, 0, 0, 2, 34, 9),
(17, 0, 0, 2, 34, 15),
(18, 0, 0, 1, 35, 11),
(19, 0, 0, 2, 35, 17),
(20, 0, 0, 2, 35, 14),
(21, 0, 0, 1, 36, 11),
(22, 0, 0, 2, 36, 14),
(23, 0, 0, 2, 36, 18),
(24, 0, 0, 1, 37, 6),
(25, 0, 0, 2, 37, 6),
(26, 0, 0, 1, 38, 3),
(27, 0, 0, 2, 38, 3),
(28, 0, 0, 2, 38, 15),
(29, 0, 0, 1, 39, 20),
(30, 0, 0, 2, 39, 15),
(31, 0, 0, 1, 40, 9),
(32, 0, 0, 2, 40, 15),
(33, 0, 0, 1, 41, 9),
(34, 0, 0, 2, 41, 15),
(35, 0, 0, 1, 42, 8),
(36, 0, 0, 1, 42, 7),
(37, 0, 0, 2, 42, 18),
(38, 0, 0, 2, 42, 1),
(39, 0, 0, 1, 43, 5),
(40, 0, 0, 2, 43, 6),
(41, 0, 0, 1, 44, 11),
(42, 0, 0, 2, 44, 17),
(43, 0, 0, 2, 44, 14),
(44, 0, 0, 1, 45, 8),
(45, 0, 0, 2, 45, 2),
(46, 0, 0, 2, 45, 1),
(47, 0, 0, 1, 46, 8),
(48, 0, 0, 2, 46, 19),
(49, 0, 0, 2, 46, 10),
(50, 0, 0, 1, 47, 10);

-- --------------------------------------------------------

--
-- Table structure for table `predmet`
--

DROP TABLE IF EXISTS `predmet`;
CREATE TABLE IF NOT EXISTS `predmet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(45) NOT NULL,
  `smer` varchar(25) DEFAULT NULL,
  `godina` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `naziv_UNIQUE` (`naziv`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `predmet`
--

INSERT INTO `predmet` (`id`, `naziv`, `smer`, `godina`) VALUES
(28, 'Softversko inženjerstvo', 'Računarstvo i informatika', 3),
(29, 'Matematika 1', 'NULL', 1),
(30, 'Web programiranje', 'Računarstvo i informatika', 3),
(31, 'Digitalna elektronika', 'Računarstvo i informatika', 2),
(32, 'Osnove telekomunikacije', 'telekomunikacije', 2),
(33, 'Elektronske komponente', 'NULL', 1),
(34, 'Elektronika 1', 'telekomunikacije', 2),
(35, 'Računarski sistemi', 'Računarstvo i informatika', 2),
(36, 'Distribuirani sistemi', 'Računarstvo i informatika', 3),
(37, 'Logičko projektovanje', 'Računarstvo i informatika', 2),
(38, 'Matematika 2', 'NULL', 1),
(39, 'Fizika', 'NULL', 1),
(40, 'Osnove elektrotehnike 1', 'NULL', 1),
(41, 'Osnove elektrotehnike 2', 'NULL', 1),
(42, 'Algoritmi i programiranje', 'NULL', 1),
(43, 'Uvod u računarstvo', 'NULL', 1),
(44, 'Arhitektura i organizacija računara', 'Računarstvo i informatika', 2),
(45, 'Objektno-orijentisano programiranje', 'Računarstvo i informatika', 2),
(46, 'Baze podataka', 'Računarstvo i informatika', 2),
(47, 'Strukture podataka', 'Računarstvo i informatika', 2),
(48, 'Diskretna matematika', 'Računarstvo i informatika', 2),
(49, 'Operativni sistemi', 'Računarstvo i informatika', 3);

-- --------------------------------------------------------

--
-- Table structure for table `prilog`
--

DROP TABLE IF EXISTS `prilog`;
CREATE TABLE IF NOT EXISTS `prilog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(45) NOT NULL,
  `path` varchar(100) NOT NULL,
  `je_slika` tinyint(2) NOT NULL DEFAULT '0',
  `MATERIJAL_id` int(11) DEFAULT NULL,
  `KOMENTAR_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_PRILOG_MATERIJAL1_idx` (`MATERIJAL_id`),
  KEY `fk_PRILOG_KOMENTAR1_idx` (`KOMENTAR_id`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `prilog`
--

INSERT INTO `prilog` (`id`, `naziv`, `path`, `je_slika`, `MATERIJAL_id`, `KOMENTAR_id`) VALUES
(84, 'Screenshot_3.png', 'uploads/1561641369779Screenshot_3.png', 1, NULL, 26),
(85, 'Vremenska tabela.jpg', 'uploads/1561641369783Vremenska tabela.jpg', 1, NULL, 26),
(108, 'download.jfif', 'uploads/1561818565356download.jfif', 1, NULL, 3),
(109, 'images (1).jfif', 'uploads/1561818565362images (1).jfif', 1, NULL, 3),
(110, 'images.jfif', 'uploads/1561818565363images.jfif', 1, NULL, 3),
(111, 'istockphoto-636379014-612x612.jpg', 'uploads/1561818565364istockphoto-636379014-612x612.jpg', 1, NULL, 3),
(112, 'pexels-photo-46710.jpeg', 'uploads/1561818565365pexels-photo-46710.jpeg', 1, NULL, 3),
(113, 'pexels-photo-462030.jpeg', 'uploads/1561818565371pexels-photo-462030.jpeg', 1, NULL, 3),
(114, 'pexels-photo-853168.jpeg', 'uploads/1561818565373pexels-photo-853168.jpeg', 1, NULL, 3),
(115, 'photo-1529736576495-1ed4a29ca7e1.jfif', 'uploads/1561818565374photo-1529736576495-1ed4a29ca7e1.jfif', 1, NULL, 3),
(116, 'download.jfif', 'uploads/1561818576023download.jfif', 1, NULL, 3),
(117, 'images (1).jfif', 'uploads/1561818576023images (1).jfif', 1, NULL, 3),
(118, 'images.jfif', 'uploads/1561818576024images.jfif', 1, NULL, 3),
(119, 'istockphoto-636379014-612x612.jpg', 'uploads/1561818576025istockphoto-636379014-612x612.jpg', 1, NULL, 3),
(120, 'pexels-photo-46710.jpeg', 'uploads/1561818576026pexels-photo-46710.jpeg', 1, NULL, 3),
(121, 'pexels-photo-462030.jpeg', 'uploads/1561818576027pexels-photo-462030.jpeg', 1, NULL, 3),
(122, 'pexels-photo-853168.jpeg', 'uploads/1561818576029pexels-photo-853168.jpeg', 1, NULL, 3),
(123, 'photo-1529736576495-1ed4a29ca7e1.jfif', 'uploads/1561818576029photo-1529736576495-1ed4a29ca7e1.jfif', 1, NULL, 3),
(124, 'pexels-photo-46710.jpeg', 'uploads/1561818649964pexels-photo-46710.jpeg', 1, NULL, 4),
(125, 'pexels-photo-462030.jpeg', 'uploads/1561818649965pexels-photo-462030.jpeg', 1, NULL, 4),
(126, 'pexels-photo-853168.jpeg', 'uploads/1561818649965pexels-photo-853168.jpeg', 1, NULL, 4),
(127, 'photo-1529736576495-1ed4a29ca7e1.jfif', 'uploads/1561818649967photo-1529736576495-1ed4a29ca7e1.jfif', 1, NULL, 4),
(128, 'baza v2.png', 'uploads/1561896912230baza v2.png', 1, NULL, 3),
(129, 'baza.png', 'uploads/1561896912235baza.png', 1, NULL, 3),
(130, 'sema baze.png', 'uploads/1561896912236sema baze.png', 1, NULL, 3),
(131, 'avatar.jpg', 'uploads/1562460804223avatar.jpg', 1, NULL, 41),
(132, 'FemaleStudentAvatar.png', 'uploads/1562460804227FemaleStudentAvatar.png', 1, NULL, 41),
(139, '12JAN.jpg', 'uploads/156252462134912JAN.jpg', 1, 35, NULL),
(140, '15JAN.jpg', 'uploads/156252507283415JAN.jpg', 1, 36, NULL),
(142, 'OSskripta.pdf', 'uploads/1562532744013OSskripta.pdf', 0, 38, NULL),
(143, 'Inverted Page Table.pdf', 'uploads/1562532923910Inverted Page Table.pdf', 0, 39, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
CREATE TABLE IF NOT EXISTS `report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `korisnik_reporter` varchar(15) NOT NULL,
  `korisnik_reported` varchar(15) NOT NULL,
  `razlog` varchar(45) DEFAULT NULL,
  `MATERIJAL_id` int(11) DEFAULT NULL,
  `KOMENTAR_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_korisnik_has_korisnik_korisnik2_idx` (`korisnik_reported`),
  KEY `fk_korisnik_has_korisnik_korisnik1_idx` (`korisnik_reporter`),
  KEY `fk_report_materijal_id` (`MATERIJAL_id`),
  KEY `fk_report_komentar_id` (`KOMENTAR_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`id`, `korisnik_reporter`, `korisnik_reported`, `razlog`, `MATERIJAL_id`, `KOMENTAR_id`) VALUES
(5, 'darjan', 'zeljko', 'korisnik ponavlja isto pitanje', 18, NULL),
(7, 'darjan', 'zeljko', 'korisnik pise gluposti', NULL, 23);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `forum`
--
ALTER TABLE `forum`
  ADD CONSTRAINT `fk_FORUM_KORISNIK1` FOREIGN KEY (`KORISNIK_username`) REFERENCES `korisnik` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_FORUM_PREDMET1` FOREIGN KEY (`PREDMET_id`) REFERENCES `predmet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `komentar`
--
ALTER TABLE `komentar`
  ADD CONSTRAINT `fk_KOMENTAR_KORISNIK` FOREIGN KEY (`KORISNIK_username`) REFERENCES `korisnik` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_KOMENTAR_MATERIJAL1` FOREIGN KEY (`MATERIJAL_id`) REFERENCES `materijal` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `lajkuje`
--
ALTER TABLE `lajkuje`
  ADD CONSTRAINT `fk_MATERIJAL_has_KORISNIK_KORISNIK1` FOREIGN KEY (`KORISNIK_username`) REFERENCES `korisnik` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_MATERIJAL_has_KORISNIK_MATERIJAL1` FOREIGN KEY (`MATERIJAL_id`) REFERENCES `materijal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lajkuje_odgovor`
--
ALTER TABLE `lajkuje_odgovor`
  ADD CONSTRAINT `fk_KORISNIK_has_KOMENTAR_KOMENTAR1` FOREIGN KEY (`KOMENTAR_id`) REFERENCES `komentar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_KORISNIK_has_KOMENTAR_KORISNIK1` FOREIGN KEY (`KORISNIK_username`) REFERENCES `korisnik` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `materijal`
--
ALTER TABLE `materijal`
  ADD CONSTRAINT `fk_MATERIJAL_KORISNIK1` FOREIGN KEY (`KORISNIK_username`) REFERENCES `korisnik` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_MATERIJAL_PREDMET1` FOREIGN KEY (`PREDMET_id`) REFERENCES `predmet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `predaje`
--
ALTER TABLE `predaje`
  ADD CONSTRAINT `fk_PREDMET_has_NASTAVNIK_NASTAVNIK1` FOREIGN KEY (`NASTAVNIK_id`) REFERENCES `nastavnik` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_PREDMET_has_NASTAVNIK_PREDMET1` FOREIGN KEY (`PREDMET_id`) REFERENCES `predmet` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `prilog`
--
ALTER TABLE `prilog`
  ADD CONSTRAINT `fk_PRILOG_KOMENTAR1` FOREIGN KEY (`KOMENTAR_id`) REFERENCES `komentar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_PRILOG_MATERIJAL1` FOREIGN KEY (`MATERIJAL_id`) REFERENCES `materijal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `fk_korisnik_has_korisnik_korisnik1` FOREIGN KEY (`korisnik_reporter`) REFERENCES `korisnik` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_korisnik_has_korisnik_korisnik2` FOREIGN KEY (`korisnik_reported`) REFERENCES `korisnik` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_report_komentar_id` FOREIGN KEY (`KOMENTAR_id`) REFERENCES `komentar` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_report_materijal_id` FOREIGN KEY (`MATERIJAL_id`) REFERENCES `materijal` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
