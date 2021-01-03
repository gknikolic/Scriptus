const Database = require('../classes/Database')
const db = new Database();

const express = require('express')
const router = express.Router();


router.post("/report/obradi", (req, res)=>{
    //izbor == 1 -> kazni
    //izbor == 0 -> ignorisi
    const izbor = req.body.choice;
    const reportId = req.body.reportId;
    let q;
    switch(izbor){
        case 1:
            q = `update korisnik k
            set k.kazneni_poeni = k.kazneni_poeni + 1
            where k.username = (select korisnik_reported from report where id = ${reportId})`;
            break;
        case 0:
            q = `delete from report where id = ${reportId}`;
            break;
    }
    db.query(q)
    .then(response => {
        console.log(response);
        if(izbor == 2)
            res.send(response);
        const del = `delete from report where id = ${reportId}`
        db.query(del)
            .then(response=>{
                res.send(response);
            })
    })
})

router.get("/korisnik/najbolji", (req, res) => {
    const q = `select * from korisnik k
    where (k.tip = 'obican' or k.tip = 'moderator') and k.poeni != 0 
    order BY poeni DESC
    `; //LIMIT 10
    db.query(q)
        .then(results => {
            if(results.length) {
                return res.send(results);
            }
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})

router.post("/korisnik/promote", (req, res) => {
    const user = req.body.username;
    console.log(user);
    const q = `UPDATE korisnik
    SET tip = 'moderator'
    WHERE username = '${user}'`
    db.query(q)
        .then(results =>
            db.query(`select * from korisnik k
            where (k.tip = 'obican' or k.tip = 'moderator') and k.poeni != 0 
            order BY poeni DESC
            `)
        )
        .then(result => res.send(result))
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})

router.post("/korisnik/unpromote", (req, res) => {
    const user = req.body.username;
    console.log(user);
    const q = `UPDATE korisnik
    SET tip = 'obican'
    WHERE username = '${user}'`
    db.query(q)
        .then(results =>
            db.query(`select * from korisnik k
            where (k.tip = 'obican' or k.tip = 'moderator') and k.poeni != 0 
            order BY poeni DESC
            `))
        .then(result => res.send(result))
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})

router.get("/moderator/svi", (req, res) => {
    const q = `select * from korisnik 
    where tip = 'moderator'`;
    db.query(q)
        .then(results => {
            if(results.length) {
                return res.send(results);
            }
        })
        .catch(err => {
            console.log(err);
            res.send(err);
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

router.delete("/banuj/korisnik", (req, res) => {
    const username = req.body.user;
    const q = `update korisnik
        set tip = 'banovan' 
        where username = '${username}'`;
    db.query(q)
        .then(result => {
            res.send("Deleted");
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})

router.get("/reports", (req, res) => {
    const q = `select * from report`;
    db.query(q)
        .then(reports => {
            if(reports && reports.length)
                res.send(reports);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})

module.exports = router