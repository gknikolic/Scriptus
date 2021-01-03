
const Database = require('../classes/Database')
const db = new Database();

const express = require('express')
const router = express.Router();

router.get("/povecajPoene/:username", (req, res) => {
    const username = req.params.username;

    const q = `
        update korisnik
        set poeni = poeni + 1
        where username = '${username}'
    `;

    const vratiPoene = `
        select poeni 
        from korisnik
        where username = '${username}'
    `;

    const promote = `
        update korisnik
        set tip = 'moderator'
        where username = '${username}'
    `;

    db.query(q)
        .then(result => {
            if(result.changedRows === 1) {
                return db.query(vratiPoene);
            }
        })
        .then(poeni => {
            if(poeni.length && poeni === 50) {
                return db.query(promote);
            }
        })
        .then((result) => {
            if(result.changedRows === 1) {
                res.send("Korisnik je promotovan.");
            }
        })
})

router.get("/promote/:idOdgovora", (req, res) => {
    const idOdgovora = req.params.idOdgovora;
    const q = `update komentar
                set promoted = 1
                where id = ${idOdgovora} and promoted = 0`;
    const getUsername =`select KORISNIK_username from komentar where id = ${idOdgovora}`
    
    let user;
    db.query(q)
        .then(response => {
            if(response.changedRows){
                db.query(getUsername)
                    .then(rows => {
                        user = rows[0].KORISNIK_username;
                        const povecajPoene = `update korisnik
                        set poeni = poeni + 5 
                        where username = '${user}'`;
                        return db.query(povecajPoene);
                    })
                    .then(results => {
                        const vratiPoene = `select poeni 
                        from korisnik
                        where username = '${user}'
                        `; 
                        return db.query(vratiPoene);
                    })
                    .then(rows => {
                        const promote = `update korisnik
                        set tip = 'moderator'
                        where username = '${user}'
                        `;
                        if(rows.length && rows[0].poeni >= 50) {
                            return db.query(promote);
                        }
                        else
                        res.send("Odgovor promotovan");
                    })
                    .then(results => {
                        if(results.changedRows === 1) {
                            res.send({promoted: 1});
                        }
                        else res.send(null);
                    })
                    .catch(err => {
                        console.log(err);
                        res.send(err);
                    })
                    }
            else
                return res.send("Vec je promote-ovano")
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})
                
router.get("/unpromote/:idOdgovora", (req, res) => {
    const idOdgovora = req.params.idOdgovora;
    const q = `update komentar
                set promoted = 0
                where id = ${idOdgovora}`
    const getUsername =`select KORISNIK_username from komentar where id = ${idOdgovora}`
                
    let user;
    db.query(q)
        .then(response => {
            if(response.changedRows){
                db.query(getUsername)
                .then(rows => {
                    user = rows[0].KORISNIK_username;
                    const smanjiPoene = `update korisnik
                    set poeni = poeni - 5 
                    where username = '${user}'`;
                    return db.query(smanjiPoene);
                })
                .then(results => {
                    const vratiPoene = `select poeni 
                    from korisnik
                    where username = '${user}'
                    `; 
                    return db.query(vratiPoene);
                })
                .then(rows => {
                    const unpromote = `update korisnik
                    set tip = 'obican'
                    where username = '${user}'
                    `;
                    if(rows.length && rows[0].poeni < 50) {
                        return db.query(unpromote);
                    }
                    else
                    res.send("Odgovor unpromote-ovan");
                })
                .then(results => {
                    if(results.changedRows) {
                        res.send({promoted: 0});
                    }
                    else res.send(user);
                })
                .catch(err => {
                    console.log(err);
                    res.send(err);
                })
            }
            else
                return res.send("Nije promote-ovano")
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})

router.get("/odgovori/negativni/:predmet", (req, res) => {
    const predmeta = req.params.subject;
    const q = `SELECT * FROM komentar 
                where MATERIJAL_id in 
                (SELECT id FROM materijal where PREDMET_id = 
                (SELECT id FROM predmet WHERE naziv = '${predmet}')) and broj_lajkova < 0
                order by broj_lajkova
                `
    db.query(q)
        .then(response => {
            if(response && response.length !== 0)
                res.send(response);
            else res.send("Nema negativnih odgovora")
        })
})

router.post("/delete/odgovor", (req, res) => {
    const odgovorId = req.body.answerId;
    const q = `delete from komentar where id = ${odgovorId}`;
    db.query(q)
        .then(result => {
            res.send("Deleted");
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})

router.post("/delete/materijal", (req, res) => {
    const materijalId = req.body.materialId;
    const q = `delete from materijal where id = ${materijalId}`;
    db.query(q)
        .then(result => {
            res.send("Deleted");
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})

module.exports = router