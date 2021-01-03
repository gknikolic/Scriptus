const Database = require('../classes/Database')
const db = new Database();
const DateNow = require('../classes/DateNow')

const express = require('express')
const router = express.Router();

const upload = require('../middleware/multer')

router.post("/dodaj", upload.single("blanket"), (req, res) => {
    const naslov = req.body.data;
    const mesec = req.body.exam;
    const godina = req.body.year;
    const datum_odrzavanja = req.body.datumOdrzavanja;
    const KORISNIK_username = req.body.user;
    const predmetName = req.body.subject;
    const file = req.file;
    
    const rok = mesec + ", " + godina;
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
            (naslov, fblanket, datum, rok, KORISNIK_username, PREDMET_id, godina) VALUES 
            ('${naslov}', 2, '${new DateNow().toString()}', '${rok}',
                '${KORISNIK_username}', ${predmetId}, '${godina}')
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
        return res.send("Blanket je uspesno dodato.")
    })
    .catch(err=>{
        console.log(err)
        res.send("null");
    })
})


router.get("/pregled/:predmet", (req, res) => {
    const predmet = req.params.predmet;
    const q = `select id, naslov, godina, korisnik_username, rok from materijal 
                where predmet_id = (select id from predmet
                 where naziv = '${predmet}') and fblanket = 2
                 order by datum_odrzavanja`;
    const proveriBrojBlanketa = `select count(*) as brojPitanja
                            from materijal 
                            where PREDMET_id = 
                            (SELECT id 
                            from predmet 
                            where naziv = "${predmet}") and fblanket = 2` 
                            const getGodine = `select DISTINCT godina from materijal 
                                                where fblanket = 2 and PREDMET_id = 
                                                (select id from predmet where naziv = '${predmet}')
                                                order by godina desc`
    let odgovor = [];
    db.query(proveriBrojBlanketa)
        .then(result => {
            // console.log(result[0])
            if(result[0].brojPitanja == 0){
                res.send({"result": 0, "text":"Još uvek nema blanketa za željeni predmet"});
            }
            else{
                db.query(getGodine)
                    .then(response => {
                         //console.log(response);
                        for(let i = 0; i < response.length; i++){
                            odgovor.push({
                                            year: response[i].godina,
                                            data: [],
                            })   
                        }
                        return db.query(q)
                    })
                    .then(response => {
                        let tmp;
                        odgovor.forEach(obj => {
                            let blanketi = response.filter(objekat => {
                                if(objekat.godina === obj.year)
                                    return objekat
                            })

                            //console.log("\n \n \n \n \n \n \n \n \n \n Filtrirani blanketi ", blanketi)
                            obj.data = blanketi
                        })


                        
                        // console.log("\n \n \n \n \n \n \n \n \n \n Sredjeni objekat ")
                        // console.log(odgovor)
                        return odgovor;
                    })
                    .then(response => {
                        //console.log(response)
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
    const q =`select path, je_slika, naziv from prilog 
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

module.exports = router