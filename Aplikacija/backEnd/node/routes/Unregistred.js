const Database = require('../classes/Database.js')
const db = new Database();

const express = require('express')
const router = express.Router();

router.get("/unregistered/blanketi/pitanja/:predmet", (req, res) => {
    const predmet = req.params.predmet;
    //console.log(predmet);

    const getPitanja =  `
            select * from materijal 
            where predmet_id = (select id 
                from predmet 
                where naziv = '${predmet}')
        `;
    const getPrilog = `
            select p.MATERIJAL_id,  p.path, p.je_slika 
            from materijal m, prilog p
            where m.predmet_id = (select id from predmet 
                where naziv = 'Softversko inženjerstvo') 
            and p.MATERIJAL_id = m.id;
        `;
    let pitanja, prilozi = [];
    db.query(getPitanja) 
        .then(mat=>{
            if(mat && mat.length) {
                pitanja = mat;
                return db.query(getPrilog);
            }
            else{
                res.status(400).json("null");
            }
        })
        .then((rows) => {
            if(rows && rows.length) {
                for(let i = 0; i < pitanja.length; i++) {
                    pitanja[i].prilozi = [];
                    for(let j = 0; j < rows.length; j++) {
                        if(pitanja[i].id === rows[j].MATERIJAL_id) {
                            pitanja[i].prilozi.push(rows[j]);
                        }
                    }
                }
            }
            //res.send(pitanja);
        })
        .then(() => {
            return pitanja.map(obj => 
                ({
                    info: {
                        user : obj.KORISNIK_username,
                        likes: obj.broj_lajkova,
                    },
                    heading:{
                        year: obj.rok.split(" ").pop(),
                        exam: obj.rok.split(",")[0],
                        number: obj.broj_pitanja,
                        text: obj.naslov
                    },
                    officialAnswer:{
                        id : obj.id,
                        data: obj.tekst
                    },
                    prilozi: obj.prilozi
                })
            )
        })
        .then(odg => {
            res.send(odg);
        })
        .catch(err => {
            res.status(400).send("null u catchu" + " " + err);
        })
})

router.get("/unregistered/blanketi/odgovori/:pitanje", (req, res) => {
    const pitanjeID = req.params.pitanje;

    const getOdgovore = `
        select * 
        from komentar
        where materijal_id = ${pitanjeID}
    `;
    db.query(getOdgovore)
        .then(odg => {
            if(odg && odg.length) {
                const tmp = odg.map(obj => ({
                    id: obj.id,
                    answer: obj.tekst,
                    likes: obj.broj_lajkova,
                    user: obj.KORISNIK_username,
                    materialId: obj.MATERIJAL_id
                }))
                res.json(tmp);
            }
            else res.status(400).send("null")
        })
        .catch(err => {
            res.status(400).send("null");
        })
})

module.exports = router