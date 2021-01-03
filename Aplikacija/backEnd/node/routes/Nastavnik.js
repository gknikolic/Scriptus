const Database = require('../classes/Database.js')
const db = new Database();

const express = require('express')
const router = express.Router();

//vraca nastavnike na odredjenom predmetu
router.get("/:predmet", (req, res) => {
    const predmetName = req.params.predmet;
    const q = `
    select p.id, p.fprofesor, n.ime, n.prezime, p.ocena_zbir / p.ocena_count as srednja_ocena
    from predaje p join nastavnik n on p.nastavnik_id = n.id 
    where p.predmet_id = (select id
        from predmet 
        where naziv = '${predmetName}')
    `;
    const proveriBrojProfesora = `
    select count(*) as brojProfesora
    from predaje p join nastavnik n on p.nastavnik_id = n.id 
    where p.predmet_id = (select id
        from predmet 
        where naziv = '${predmetName}')
    `

    let odg;
    db.query(proveriBrojProfesora)
    .then(result => {
        console.log(result[0])
        if(result[0].brojProfesora == 0){
            res.send({"result": 0, "text":"Još uvek nema profesora za željeni predmet"});
        }
        else{
            db.query(q)
                .then((rows)=>{
                    //console.log(rows);
                    for(let i = 0; i < rows.length; i++){
                        if(rows[i].srednja_ocena === null){
                            rows[i].srednja_ocena = 0;
                        }
                    }
                    //console.log(rows);
                    return rows;
                })
                .then((rows) => {
                    return rows.map(obj => ({
                            fprofesor : obj.fprofesor === 1 ? obj.fprofesor = "Profesor" : "Asistent",
                            ime : obj.ime,
                            prezime : obj.prezime,
                            srednja_ocena: obj.srednja_ocena,
                            predajeId : obj.id
                        })
                    )
                })
                .then(rows => {
                    odg = rows;
                    //return db.close();
                })
                .then(() => {
                    //ovde moze da se radi nesto sa odg koji je van Promise-chaining
                    res.send(odg);
                })
        }
    })
});

router.post("/oceni", (req, res) => {
    const id = req.body.id
    const ocena = parseInt(req.body.ocena) + 1;
    console.log(ocena);
    console.log(id);

    const q = `
        UPDATE predaje
        set predaje.ocena_zbir = predaje.ocena_zbir + '${ocena}', predaje.ocena_count = predaje.ocena_count + 1
        where predaje.id = '${id}'`

    const q2 = `
        select ocena_zbir / ocena_count as ocena 
        from predaje
        where id = ${id}
    `;
    db.query(q)
        .then(()=> {
            return db.query(q2);
        })
        .then(result => {
            //console.log(result[0].ocena);
            res.send({ocena : result[0].ocena});
        })
        .catch(err => {
            res.send(err);
        })
})

router.post("/dodaj", (req, res) => {
    const ime = req.body.name;
    const prezime = req.body.surname;
    const predmet = req.body.subject;
    const fprofesor = req.body.professionType;;
    const getPredmetId = `
    select id from predmet
    where naziv = '${predmet}'
    `;
    const proveriProfesora = `select id as insertId, count(*) as postoji from nastavnik 
                                where ime = '${ime}' and prezime = '${prezime}'`;

    const dodajProfesora = `insert into nastavnik (ime, prezime)
                                 values('${ime}','${prezime}')`;
    let predmetId;
    let profesorId;
    let tmp;
    db.query(getPredmetId)
        .then(result => {
            predmetId = result[0].id;
            console.log(predmetId);
            return db.query(proveriProfesora)
        })
        .then(result => {
            tmp = result[0];
            console.log(result[0])
            if(tmp.postoji == 1){
                return tmp;
            }
            else{
                return db.query(dodajProfesora)
            }
        })
        .then(response => {
            console.log(response);
            profesorId = response.insertId;
            const dodajPredaje =`insert into predaje(fprofesor, predmet_id, nastavnik_id)
                                            values(${fprofesor}, ${predmetId}, ${profesorId})`;
            return db.query(dodajPredaje)
        })
        .then(response => {
            console.log(response);
            res.send(response)
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})

module.exports = router