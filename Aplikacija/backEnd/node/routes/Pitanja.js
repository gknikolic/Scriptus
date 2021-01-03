const Prikaz = require('../classes/Prikaz')
const DateNow = require('../classes/DateNow')
const Database = require('../classes/Database.js')

const db = new Database();

const express = require('express')
const router = express.Router()

const upload = require('../middleware/multer')

    //pretraga po naslovu (sadrzi odredjene reci)
router.post('/pretrazi', (req, res) => {
    const predmetName = req.body.predmet
    const smer = req.body.smer
    const username = req.body.username
    const searchString = req.body.searchString

    const words = searchString.split(" ")
    const whereQuery = words
        .map((word, i) => {
            if(i < words.length - 1) return `naslov like '%${word}%' and`
            else return `naslov like '%${word}%'`
        })
        .join(" ")


    const q = `
        select *
        from materijal 
        where predmet_id = (select id from predmet where naziv = '${predmetName}' and smer = '${smer}')
        and ${whereQuery}
        and fblanket = 1
        order by broj_lajkova desc
    `

    try {
        new Prikaz(username, res).prikaziPitanja(q, predmetName)
    } catch(Err) {
        res.json(Err)
    }
    
})

    //sa prilogom
    //razmisliti da li da se implementira za moderatora (f-ja radi)
router.post("/dodajCelo", upload.array('files', 12), (req, res) => {
    //console.log(req.body);
    const naslov = req.body.data;
    const mesec = req.body.exam;
    const godina = req.body.year;
    const broj_pitanja = req.body.number;
    const KORISNIK_username = req.body.user;
    const predmetName = req.body.subject;
    const files = req.files
    
    const rok = mesec + ", " + godina;

    const getPredmetId = `
        select id from predmet
        where naziv = '${predmetName}'
    `;

    let predmetId
    let q
    let idDodatog

    db.query(getPredmetId)
    .then(rows => {
        if(rows.length){
            predmetId = rows[0].id;
            q = `
            INSERT INTO MATERIJAL 
            (naslov, fblanket, datum,rok, broj_pitanja, KORISNIK_username, PREDMET_id) VALUES 
            ('${naslov}', 1, '${new DateNow().toString()}', '${rok}', ${broj_pitanja},
                '${KORISNIK_username}', ${predmetId})
            `;
        }
        
        return db.query(q);
    })
    .then((e) =>{
        //console.log(e.insertId);
        return db.query(`select max(id) as id from materijal`);    
    })
    .then((rows) => {
        idDodatog = rows[0].id

        if (files.length === 0) {
            return "Nema priloge"
        }

        q = `INSERT INTO PRILOG (naziv, path, je_slika, materijal_id) VALUES\n`
        files.forEach((file, i) => {
          let pom = file.path.split("\\")
          let path = pom[0] + "/" + pom[1]
      
          
          q += `('${file.originalname}', '${path}', ${file.mimetype.includes("image") ? 1 : 0}, ${idDodatog})`
          if(i < files.length - 1) q += ",\n"
        })
        return db.query(q)
    })
    .then((result) => {
        console.log(`Dodato je pitanje ID=${idDodatog} za predmet ${predmetName}`)
        console.log(result)

        return res.send("Pitanje je uspesno dodato.")
    })
    .catch(err => console.log(err))
})

    //bez priloga
    //obradjuje dugme za dodavanje pitanja kao obicni korisnik
router.post("/dodaj", (req, res) => {
    const naslov = req.body.question;
    const mesec = req.body.exam;
    const godina = req.body.year;
    const broj_pitanja = req.body.number;
    const KORISNIK_username = req.body.user;
    const predmetName = req.body.subject;
    console.log(req.body.data);
    const rok = mesec + ", " + godina;

    const getPredmetId = `
        select id from predmet
        where naziv = '${predmetName}'
    `;

    let predmetId;
    let q;

    db.query(getPredmetId)
    .then(rows => {
        if(rows.length){
            predmetId = rows[0].id;
            q = `
            INSERT INTO MATERIJAL 
            (naslov, fblanket, datum, rok, broj_pitanja, KORISNIK_username, PREDMET_id) VALUES 
            ('${naslov}', 1, '${new DateNow().toString()}', '${rok}', ${broj_pitanja},
                '${KORISNIK_username}', ${predmetId})
            `;
        }
        
        return db.query(q);
    })
    .then((e) =>{
        //console.log(e.insertId);
        return db.query(`select max(id) as id from materijal`);    
    })
    .then((id) => {
        res.send(id[0]);
    })
})

    //vraca samo jedno pitanje
router.get("/jedno/:pitanjeId/:username", (req, res) => {
    
    const pitanjeId = req.params.pitanjeId;
    const username = req.params.username;

    try {
        new Prikaz(username, res).prikaziPitanje(pitanjeId)
    } catch(Err) {
        res.json(Err)
    }

})

    //vraca sva pitanja za odgovarajuci pregled
router.get("/:predmet/:username", (req, res) => {
    
    const predmet = req.params.predmet;
    const username = req.params.username;

    const getPitanja = `
            select * from materijal 
            where predmet_id = (select id 
                from predmet 
                where naziv = '${predmet}')
                and fblanket = 1
        `;
        const proveriBrojPitanja = `select count(*) as brojPitanja
                                    from materijal 
                                    where PREDMET_id = 
                                    (SELECT id 
                                    from predmet 
                                    where naziv = "${predmet}") and fblanket = 1`
        db.query(proveriBrojPitanja)
            .then(result => {
                console.log(result[0])
                if(result[0].brojPitanja == 0){
                    res.send({"result": 0, "text":"Još uvek nema materijala za željeni predmet"});
                }
                else
                    try {
                        new Prikaz(username, res).prikaziPitanja(getPitanja, predmet)
                    } catch(Err) {
                        res.json(Err)
                    }
            })
})

    //implementira lajkovanje
router.post("/lajkuj", (req, res) => {

    const username = req.body.username;
    const materijal_id = req.body.materijal_id;
    //const lajkStatus = req.body.lajk;

    // 1 = lajk
    // 0 = nista
    // -1 = dislajk

    //if(username == null) res.status(400).send("Ne moze da se lajkuje jer nisi prijavljen.")

    const brojLajkova = `
        select broj_lajkova from materijal
        where id = ${materijal_id}
    `

    const q = `
        select lajk_dislajk from lajkuje
        where korisnik_username = '${username}' 
        and materijal_id = ${materijal_id}
    `

    const dodaj = `
        insert into lajkuje 
        (korisnik_username, materijal_id, lajk_dislajk) 
        values ('${username}', ${materijal_id}, 1)
    `;

    const promeni = `
        update lajkuje set lajk_dislajk = 1 
        where korisnik_username = '${username}' 
        and materijal_id = ${materijal_id}
    `

    const izbrisi = `
        delete from lajkuje 
        where korisnik_username = '${username}' 
            and materijal_id = ${materijal_id}
    `;

    //menjaju stanje broj_lajkova
    const lajkuj = `
        update materijal
        set broj_lajkova = broj_lajkova + 1
        where id = ${materijal_id}
    `;

    const dislajkToLajk = `
        update materijal
        set broj_lajkova = broj_lajkova + 2
        where id = ${materijal_id}
    `

    const dislajkuj = `
        update materijal
        set broj_lajkova = broj_lajkova - 1
        where id = ${materijal_id}
    `;


    let broj, autor
    db.query(`select korisnik_username from materijal where id = ${materijal_id}`)
        .then(result => {
            autor = result[0].korisnik_username
            return db.query(brojLajkova)
        })
        .then(result => broj = result[0].broj_lajkova)
        .then(() => db.query(q))
        .then(result => {
            if(result.length) return result[0].lajk_dislajk
            else return 0
        })
        .then(lajkStatus => {
            switch(Number(lajkStatus)) {
                case -1: { 
                    db.query(promeni)
                        .then(() => {
                            return db.query(dislajkToLajk)
                        })
                        .then(() => {
                            console.log("dislajk to lajk")
                            res.send(`${broj + 2}`)
                        })
                        .then(() => db.query(`update korisnik set poeni = poeni + 2 where username = "${autor}"`))
                        .catch(err => console.log(err))
                        break
                }
                case 0: {
                    db.query(dodaj)
                    .then(() => {
                        return db.query(lajkuj)
                    })
                    .then(() => {
                        console.log("nista to lajk")
                        return res.send(`${broj + 1}`)
                    })
                    .then(() => 
                    {
                        return db.query(`update korisnik set poeni = poeni + 1 where username = "${autor}"`)
                    })
                    .catch(err => console.log(err))
                    break
                }
                case 1: {
                    db.query(izbrisi)
                    .then(() => {
                        return db.query(dislajkuj)
                    })
                    .then(() => {
                        console.log("lajk to nista")
                        res.send(`${broj - 1}`)
                    })
                    .then(() => db.query(`update korisnik set poeni = poeni - 1 where username = "${autor}"`))
                    .catch(err => console.log(err))
                    break
                }
                
            }
        })

});

router.post("/dislajkuj", (req, res) => {

    const username = req.body.username;
    const materijal_id = req.body.materijal_id;
    //const lajkStatus = req.body.lajk;

    // 1 = lajk
    // 0 = nista
    // -1 = dislajk

    //if(username == null) res.status(400).send("Ne moze da se lajkuje jer nisi prijavljen.")

    const brojLajkova = `
        select broj_lajkova from materijal
        where id = ${materijal_id}
    `

    const q = `
        select lajk_dislajk from lajkuje
        where korisnik_username = '${username}' 
        and materijal_id = ${materijal_id}
    `

    const dodaj = `
        insert into lajkuje 
        (korisnik_username, materijal_id, lajk_dislajk) 
        values ('${username}', ${materijal_id}, '-1')
    `;

    const promeni = `
        update lajkuje set lajk_dislajk = '-1' 
        where korisnik_username = '${username}' 
        and materijal_id = ${materijal_id}
    `

    const izbrisi = `
        delete from lajkuje 
        where korisnik_username = '${username}' 
            and materijal_id = ${materijal_id}
    `;

    //menjaju stanje broj_lajkova
    const lajkuj = `
        update materijal
        set broj_lajkova = broj_lajkova + 1
        where id = ${materijal_id}
    `;

    const lajkToDislajk = `
        update materijal
        set broj_lajkova = broj_lajkova - 2
        where id = ${materijal_id}
    `

    const dislajkuj = `
        update materijal
        set broj_lajkova = broj_lajkova - 1
        where id = ${materijal_id}
    `;


    let broj, autor;
    db.query(`select korisnik_username from materijal where id = ${materijal_id}`)
        .then(result => {
            autor = result[0].korisnik_username
            return db.query(brojLajkova)
        })
        .then(result => broj = result[0].broj_lajkova)
        .then(() => db.query(q))
        .then(result => {
            if(result.length) return result[0].lajk_dislajk
            else return 0
        })
        .then(lajkStatus => {
            switch(Number(lajkStatus)) {
                case 1: { 
                    db.query(promeni)
                        .then(() => {
                            return db.query(lajkToDislajk)
                        })
                        .then(() => {
                            console.log("lajk to dislajk")
                            res.send(`${broj - 2}`)
                        })
                        .then(() => db.query(`update korisnik set poeni = poeni - 2 where username = "${autor}"`))
                        .catch(err => console.log(err))
                        break
                }
                case 0: {
                    db.query(dodaj)
                    .then(() => {
                        return db.query(dislajkuj)
                    })
                    .then(() => {
                        console.log("nista to dislajk")
                        res.send(`${broj - 1}`)
                    })
                    .then(() => 
                    {
                        return db.query(`update korisnik set poeni = poeni - 1 where username = "${autor}"`)
                    })
                    .catch(err => console.log(err))
                    break
                }
                case -1: {
                    db.query(izbrisi)
                    .then(() => {
                        return db.query(lajkuj)
                    })
                    .then(() => {
                        console.log("dislajk to nista")
                        res.send(`${broj + 1}`)
                    })
                    .then(() => db.query(`update korisnik set poeni = poeni + 1 where username = "${autor}"`))
                    .catch(err => console.log(err))
                    break
                }
            }
        })
})


router.post("/kopija", (req, res) => {
    const idOriginal = req.body.idOriginal;
    const idKopija = req.body.idCopy;

    const kopija = `update materijal 
                    set original = 0
                    where id =${idKopija}`;
    const updateLajk = `update materijal m1, materijal m2 
                        set m1.broj_lajkova = m1.broj_lajkova + m2.broj_lajkova, m2.broj_lajkova = 0
                        where m1.id = ${idOriginal} and m2.id = ${idKopija};`
    const prebaciOdgovore = `update komentar
                            set MATERIJAL_id = ${idOriginal}
                            where MATERIJAL_id = ${idKopija}
                            `
        db.query(kopija)
        .then(r => {
            return db.query(updateLajk);
        })
        .then(response =>{
            return db.query(prebaciOdgovore)
        })
        .then(response => {
            res.send(response);
        })
})

router.post("/kviz", (req, res) => {
    const predmet = req.body.predmet;
    const getPitanja =  `
        select * from materijal where predmet_id=28 and fblanket = 1
        `;
    try {
        new Prikaz(null, res).kviz(getPitanja);
    } catch(Err) {
        res.json(Err)
    }
})

module.exports = router