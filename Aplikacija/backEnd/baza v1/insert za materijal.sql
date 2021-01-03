/*datatime = 'YYYY-MM-DD hh:mm:ss[.fraction]' */ /*koristi se za datum*/
/*date = 'YYYY-MM-DD' */ /*ovo se koristi za rok ako je blanket*/
/* fblanket = 1 ako je blanket => rok = neki datum, 
	ako nije onda fblanket = 0 => rok = null*/
/* tekst se koristi ako nema prilog ili kao neka dopuna*/

INSERT INTO `softversko`.`materijal`
(`naslov`, `broj_lajkova`, `datum`, `tekst`, `fblanket`, `rok`, `KORISNIK_username`, `PREDMET_id`) VALUES
('lab1', 10, '2019-05-05 23:59:59', null,  0,  null, 'batabane', 36);

