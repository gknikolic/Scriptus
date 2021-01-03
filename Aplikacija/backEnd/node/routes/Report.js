const Database = require('../classes/Database')
const db = new Database();

const express = require('express')
const router = express.Router();

const upload = require('../middleware/multer')

router.post("/materijal", (req, res)=>{
    const userReporter = req.body.user
    const materijalId = req.body.materialId
    const razlog = req.body.cause
    
    const q = `
        select korisnik_username
        from materijal 
        where id = ${materijalId}
    `
    
    db.query(q)
        .then(userReported => {
            const q1 = `
                insert into report (korisnik_reporter, korisnik_reported, razlog, MATERIJAL_id) values
                ('${userReporter}', '${userReported[0].korisnik_username}', '${razlog}', '${materijalId}')
            `
            return db.query(q1)
        })
        .then(() => res.send({rezultat: "uspesno"}))
        .catch(err => res.send(err))
})

// router.get("/pitanje/:idPitanja", (req, res)=>{
    
// })

router.post("/odgovor", (req, res)=>{
    const userReporter = req.body.user
    const odgovorId = req.body.answerId
    const razlog = req.body.cause
    const q = `
        select korisnik_username
        from komentar 
        where id = ${odgovorId}
    `
    
    db.query(q)
        .then(userReported => {
            const q1 = `
                insert into report (korisnik_reporter, korisnik_reported, razlog, KOMENTAR_id) values
                ('${userReporter}', '${userReported[0].korisnik_username}', '${razlog}', '${odgovorId}')
            `
            return db.query(q1)
        })
        .then(() => res.send({rezultat: "uspesno"}))
        .catch(err => res.send(err))
})

module.exports = router