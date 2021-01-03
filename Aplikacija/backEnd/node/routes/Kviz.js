const Database = require('../classes/Database.js')
const db = new Database();

const express = require('express')
const router = express.Router();

router.get("/:predmetName", (req, res) => {
    const predmetName = req.params.predmetName

    let predmetId, redniBrojeviPitanja = [], pitanjaZaKviz = []
    db.query(`select id from predmet where naziv = '${predmetName}'`)
        .then(results => {
            if(results.length)
                predmetId = results[0].id
            else 
                throw Error("Predmet nije nadjen u bazi.")
            return db.query(`select distinct broj_pitanja from materijal 
                                where predmet_id = ${predmetId} and fblanket = 1
                                order by broj_pitanja`)
        })
        .then(results => {
            if(results.length < 4) //najmanji broj pitanja da bi postojao kviz
                throw Error(`Nema uslova za postojanje kviza za predmet ${predmetName}`)
            else {
                results.forEach(row => redniBrojeviPitanja.push(row.broj_pitanja))
            }
            return db.query(`
                select *, rand() as random from materijal 
                where predmet_id = ${predmetId} and fblanket = 1
                order by broj_pitanja
            `)
        })
        .then(pitanja => {
            let max //max vrednost za random
            let iMax //indeks pitanja koje ima max vrednost
            for(let i = 0; i < redniBrojeviPitanja.length; i++) {
                max = 0
                iMax = 0
                for(let j = 0; j < pitanja.length; j++) {
                    if(redniBrojeviPitanja[i] == pitanja[j].broj_pitanja && max < pitanja[j].random) {
                        max = pitanja[j].random
                        iMax = j
                    } 
                    else if (redniBrojeviPitanja[i] < pitanja[j].broj_pitanja) break //ubrzava jer iz baze dolazi sortiranja lista
                }
                pitanjaZaKviz.push(pitanja[iMax])
            }
        })
        .then(() => {
            return pitanjaZaKviz.map(obj => {
                let s = obj.datum.toISOString().split(/T|-|:/)
                obj.datum = `${s[2]}.${s[1]}.${s[0]}. ${s[3]}:${s[4]}`
            
                return ({
                    info: {
                        user : obj.KORISNIK_username,
                        likes: obj.broj_lajkova,
                        isLiked: obj.lajk,
                        datum: obj.datum
                    },
                    heading:{
                        year: obj.rok.split(" ").pop(),
                        exam: obj.rok.split(",")[0],
                        number: obj.broj_pitanja,
                        text: obj.naslov
                    },
                    officialAnswer:{
                        id : obj.id,
                    },
                })
            }
            )
        })
        .then((result) => res.send(result))
        .catch((err) => {
            console.log(err)
            //res.send("null")
            res.send({"result": 0, "text":`Nema uslova za postojanje kviza za predmet ${predmetName}`});
        })
        
})

module.exports = router