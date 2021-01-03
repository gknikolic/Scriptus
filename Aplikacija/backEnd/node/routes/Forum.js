const Database = require('../classes/Database')
const db = new Database();
const DateNow = require('../classes/DateNow')

const express = require('express')
const router = express.Router();

const upload = require('../middleware/multer')


router.post("/dodaj", (req, res) => {
    const naslov = 'Forum';
    const KORISNIK_username = req.body.user;
    const predmetName = req.body.subject;
    const tekst = req.body.text;

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
            (naslov, fblanket, datum, tekst, KORISNIK_username, PREDMET_id) VALUES 
            ('${naslov}', 3, '${new DateNow().toString()}', '${tekst}',
                '${KORISNIK_username}', ${predmetId})
            `;
            return db.query(q);
        }
    })
    .then((result) => {
        idDodatog = result.insertId;
        console.log(`Dodata je nova stavka u forum ID=${idDodatog}`)
        return res.send( {"response":"Tekst je uspesno dodat u forum."})
    })
    .catch(err=>{
        console.log(err)
        res.send("null");
    })
})

router.get("/pregled/:predmet", (req, res) => {
    const predmet = req.params.predmet;
    const getPredmetId = `
    select id from predmet
    where naziv = '${predmet}'
    `;
    const proveriBrojPostova = `select count(*) as brojPitanja
    from materijal
    where PREDMET_id = 
    (SELECT id 
    from predmet 
    where naziv = "${predmet}") and fblanket = 1`
    let predmetId;
    db.query(proveriBrojPostova)
        .then(result => {
            console.log(result[0])
            if(result[0].brojPitanja == 0){
                res.send({"result": 0, "text":"Još uvek nema postova u forumu za željeni predmet"});
            }
            else{
                db.query(getPredmetId)
                    .then(response => {
                        predmetId = response[0].id;
                        const getForum = `select m.id, m.tekst, m.datum, k.username, k.path, k.poeni, k.tip from
                                        materijal m INNER join korisnik k on m.KORISNIK_username = k.username
                                        where predmet_id = ${predmetId} and fblanket = 3
                                        order by datum
                                        `;
                        return db.query(getForum)
                    })
                    .then(response => {
                        return response.map(obj => 
                            ({
                                userInfo: {
                                    user : obj.username,
                                    type : obj.tip,
                                    path : obj.path,
                                    points : obj.poeni
                                },
                                heading:{
                                    text: obj.tekst,
                                    datum: obj.datum
                                },
                                answerInfo:{
                                    id : obj.id,
                                },
                            })
                        )
                    })
                    .then(result => {
                        for(let i = 0; i < result.length; i++){
                            let s = result[i].heading.datum.toISOString().split(/T|-|:/);
                            result[i].heading.datum = `${s[2]}.${s[1]}.${s[0]}. ${s[3]}:${s[4]}`
                        }
                        res.send(result);
                    })
                    .catch(err => {
                        console.log(err);
                        res.send(err);
                    })
            }
        })
})

module.exports = router