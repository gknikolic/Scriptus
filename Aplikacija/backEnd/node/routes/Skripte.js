const Database = require('../classes/Database')
const db = new Database();
const DateNow = require('../classes/DateNow')

const express = require('express')
const router = express.Router();

const upload = require('../middleware/multer')

router.get("/pregled/:predmet", (req, res) => {
    const predmet = req.params.predmet;
    const q = `select id, naslov, korisnik_username from materijal 
                where predmet_id = (select id from predmet
                 where naziv = '${predmet}') and fblanket = 0
                 order by datum desc`;
    const proveriBrojSkripti = `select count(*) as brojPitanja
                                from materijal 
                                where PREDMET_id = 
                                (SELECT id 
                                from predmet 
                                where naziv = "${predmet}") and fblanket = 1`;
    db.query(proveriBrojSkripti)
        .then(result => {
            console.log(result[0])
            if(result[0].brojPitanja == 0){
                res.send({"result": 0, "text":"Još uvek nema skripti za željeni predmet"});
            }
            else{
                db.query(q)
                    .then(response => {
                        res.send(response);
                    })
                    .catch(err => {
                        console.log(err);
                        res.send(err);
                    })
            }
        })
})

router.get("/prilog/:id", (req, res) => {
    const idMaterijala = req.params.id;
    const q =`select path, naziv from prilog 
            where materijal_id = ${idMaterijala}`;
    let odgovor;
    db.query(q)
        .then(result => {
            odgovor = result;
            let tmp;
            tmp = result[0].naziv.split(".");
            odgovor[0].tip = tmp[tmp.length - 1];
            console.log(odgovor);
            res.send(odgovor)

        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})

router.post("/dodaj", upload.single("skripta"), (req, res) => {
    const naslov = req.body.data;
    const KORISNIK_username = req.body.user;
    const predmetName = req.body.subject;
    const file = req.file;
    console.log(req.body);

    const getPredmetId = `
    select id from predmet
    where naziv = '${predmetName}'
    `;

    let predmetId;
    let q;
    let idDodatog;

    db.query(getPredmetId)
    .then(rows => {
        if(rows.length){
            predmetId = rows[0].id;
            q = `
            INSERT INTO MATERIJAL 
            (naslov, fblanket, datum, KORISNIK_username, PREDMET_id) VALUES 
            ('${naslov}', 0, '${new DateNow().toString()}',
                '${KORISNIK_username}', ${predmetId})
            `;
            return db.query(q);
        }
    })
    .then(response => {
        idDodatog = response.insertId;
        let pom = file.path.split("\\")
        let path = pom[0] + "/" + pom[1]
        q = `INSERT INTO PRILOG (naziv, path, je_slika, materijal_id) VALUES
        ('${file.originalname}', '${path}', ${file.mimetype.includes("image") ? 1 : 0}, ${idDodatog})`
        return db.query(q)
    })
    .then((result) => {
        console.log(`Dodat je prilog ID=${result.insertId} za materijal ID=${idDodatog}`)
        return res.send("Skripta je uspesno dodata.")
    })
    .catch(err=>{
        console.log(err)
        res.send("null");
    })
})

module.exports = router