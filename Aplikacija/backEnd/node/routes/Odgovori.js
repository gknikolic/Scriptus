const Prikaz = require('../classes/Prikaz')
const DateNow = require('../classes/DateNow')
const Database = require('../classes/Database.js')

const db = new Database();

const express = require('express')
const router = express.Router()

const upload = require('../middleware/multer')

//vraca odgovore za jedno pitanje
router.get("/:pitanje/:username", (req, res) => {
    const pitanjeID = req.params.pitanje;
    const username = req.params.username;

    const getOdgovore = `
        select * 
        from komentar
        where materijal_id = ${pitanjeID}
        order by promoted desc, broj_lajkova desc
    `;

    try {
        new Prikaz(username, res).prikaziOdgovore(getOdgovore, pitanjeID)
    } catch(Err) {
        res.json(Err)
    }
});

//vraca samo jedan odgovor
router.get("/jedan/:odgovorId/:username", (req, res) => {
    const odgovorId = req.params.odgovorId
    const username = req.params.username

    try {
        new Prikaz(username, res).prikaziOdgovor(odgovorId)
    } catch(Err) {
        res.json(Err)
    }
})

//dodaje odgovor za pitanje (sa prilogom)
router.post("/dodaj", upload.array('files', 12), (req, res) => {
    const odgovorTekst = req.body.answer
    const idMaterijala = req.body.materialId
    const username = req.body.user
    const files = req.files

    let q =`
        insert into komentar (tekst, datum, KORISNIK_username, MATERIJAL_id) 
        values ('${odgovorTekst}', '${new DateNow().toString()}', '${username}', ${idMaterijala})
    `;

    let idDodatog

    db.query(q)
    .then(result => {
        if(result.affectedRows == 1) {
            q = `
                select max(id) as id from komentar
            `
            return db.query(q)
        }
        else {
            throw new Error("Greska pri dodavannju")
        }
    })
    .then(result => {
        
        idDodatog = result[0].id
        if (files.length === 0) {
            return "Nema priloge"
        }
        
        let q = `INSERT INTO PRILOG (naziv, path, je_slika, komentar_id) VALUES\n`
        files.forEach((file, i) => {
        let pom = file.path.split("\\")
        let path = pom[0] + "/" + pom[1]
    
        
        q += `('${file.originalname}', '${path}', ${file.mimetype.includes("image") ? 1 : 0}, ${idDodatog})`
        if(i < files.length - 1) q += ",\n"
        })
    
    
        return db.query(q)
    })
    .then((result) => {
        console.log(`Dodat je odogovor ID=${idDodatog} za pitanje ID=${idMaterijala}`)
        //console.log(result)

        return res.send("Odgovor je uspesno dodato.")
    })
    .catch(err=>{
        console.log(err)
        res.send("null");
    })
})

router.post("/lajkuj", (req, res) => {
    const username = req.body.username;
    const komentar_id = req.body.komentar_id;

    // 1 = lajk
    // 0 = nista
    // -1 = dislajk

    //if(username == null) res.status(400).send("Ne moze da se lajkuje jer nisi prijavljen.")

    const brojLajkova = `
        select broj_lajkova from komentar
        where id = ${komentar_id}
    `

    const q = `
        select lajk_dislajk from lajkuje_odgovor
        where korisnik_username = '${username}' 
        and komentar_id = ${komentar_id}
    `

    //obradjuje tabelu lajkuje_odgovor
    const dodaj = `
        insert into lajkuje_odgovor
        (korisnik_username, komentar_id, lajk_dislajk) 
        values ('${username}', ${komentar_id}, 1)
    `;

    const promeni = `
        update lajkuje_odgovor set lajk_dislajk = 1 
        where korisnik_username = '${username}' 
        and komentar_id = ${komentar_id}
    `

    const izbrisi = `
        delete from lajkuje_odgovor
        where korisnik_username = '${username}' 
            and komentar_id = ${komentar_id}
    `;

    //menjaju stanje broj_lajkova
    const lajkuj = `
        update komentar
        set broj_lajkova = broj_lajkova + 1
        where id = ${komentar_id}
    `;

    const dislajkToLajk = `
        update komentar
        set broj_lajkova = broj_lajkova + 2
        where id = ${komentar_id}
    `

    const dislajkuj = `
        update komentar
        set broj_lajkova = broj_lajkova - 1
        where id = ${komentar_id}
    `;


    let broj, autor
    db.query(`select korisnik_username from komentar where id = ${komentar_id}`)
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
                        res.send(`${broj + 1}`)
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
})

router.post("/dislajkuj", (req, res) => {
    const username = req.body.username;
    const komentar_id = req.body.komentar_id;

    // 1 = lajk
    // 0 = nista
    // -1 = dislajk

    //if(username == null) res.status(400).send("Ne moze da se lajkuje jer nisi prijavljen.")

    const brojLajkova = `
        select broj_lajkova from komentar
        where id = ${komentar_id}
    `

    const q = `
        select lajk_dislajk from lajkuje_odgovor
        where korisnik_username = '${username}' 
        and komentar_id = ${komentar_id}
    `

    //obradjuje tabelu lajkuje_odgovor
    const dodaj = `
        insert into lajkuje_odgovor
        (korisnik_username, komentar_id, lajk_dislajk) 
        values ('${username}', ${komentar_id}, -1)
    `;

    const promeni = `
        update lajkuje_odgovor set lajk_dislajk = -1 
        where korisnik_username = '${username}' 
        and komentar_id = ${komentar_id}
    `

    const izbrisi = `
        delete from lajkuje_odgovor
        where korisnik_username = '${username}' 
            and komentar_id = ${komentar_id}
    `;

    //menjaju stanje broj_lajkova
    const lajkuj = `
        update komentar
        set broj_lajkova = broj_lajkova + 1
        where id = ${komentar_id}
    `;

    const lajkToDislajk = `
        update komentar
        set broj_lajkova = broj_lajkova - 2
        where id = ${komentar_id}
    `

    const dislajkuj = `
        update komentar
        set broj_lajkova = broj_lajkova - 1
        where id = ${komentar_id}
    `;


    let broj, autor;
    db.query(`select korisnik_username from komentar where id = ${komentar_id}`)
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

    //bez priloga (NE KORISTI SE)
router.post("/dodajBezPriloga", (req, res) =>{
    const odgovorTekst = req.body.answer;
    const idMaterijala = req.body.materialId;
    const username = req.body.user;

    const q =`
        insert into komentar (tekst, KORISNIK_username, MATERIJAL_id) 
        values ('${odgovorTekst}', '${username}', ${idMaterijala})
    `;

    db.query(q)
    .then(odg => {
        console.error(odg);
        res.send({idOdgovor : odg.insertId});
    })
    .catch(err=>{
        res.send("null");
    })
})

router.get("/promote/:id", (req, res) => {
    const id = req.params.id;
    

    const q = `update komentar
               set 'promoted' = 1
               where id = ${id}`
               console.log(q)
       db.query(q)
           .then(response => {
               res.send(response);
           })
           .catch(err => {
               console.log(err);
               res.send(err);
           })
})

router.get("/unpromote/:id", (req, res) => {
   const id = req.params.id;
   const q = `UPDATE komentar SET (promoted = '0') WHERE (id = ${id});
   `

      db.query(q)
          .then(response => {
              res.send(response.affectedRows);
          })
          .catch(err => {
              console.log(err);
              res.send(err);
          })
})

 module.exports = router

