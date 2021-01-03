const Database = require('./Database')
const db = new Database()



class Prikaz {

    constructor(user, res) {
        this.user = user
        this.res = res
        this.checkRegistred()
    }

    checkRegistred() {
        if(this.user === "null") 
            this.user = 'darjan'
    }


    prikaziPitanje(pitanjeId) {

        const q = `
            select * from materijal where id = ${pitanjeId}
        `

        const getLajkovao = `
            select materijal_id, lajk_dislajk
            from lajkuje
            where materijal_id = ${pitanjeId} and korisnik_username = '${this.user}'
        `; 

        let pitanje
        db.query(q) 
            .then(mat => {
                if(mat && mat.length) {
                    pitanje = mat[0];
                    return db.query(getLajkovao);
                }
                else 
                    throw new Error(`Nema materijala`)
            })
            .then(lajk => {
                if(lajk.length)
                    pitanje.lajk = Number(lajk.lajk_dislajk) === 1 ? 1 : -1 //1 za lajk, -1 za dislajk
                else 
                    pitanje.lajk = 0

                let s = pitanje.datum.toISOString().split(/T|-|:/)
                pitanje.datum = `${s[2]}.${s[1]}.${s[0]}. ${s[3]}:${s[4]}`
                return pitanje
            })
            .then((obj) => {
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
                
            })
            .then(odg => {
                return this.res.send(odg)
            })
            .catch(err => {
                console.log(err.message)
                return this.res.send("null")
            })
    }

        //prikazuje sva pitanja za jedan predmet
    prikaziPitanja(query, predmetName) {

        //console.log(this.user)

        const getLajkovao = `
                select m.id, l.lajk_dislajk
                from materijal m join lajkuje l on m.id = l.materijal_id 
                where predmet_id = (select id from predmet where naziv = '${predmetName}') 
                and l.korisnik_username = '${this.user}'
                order by m.id
        `; 

        let pitanja, lajkovi;
        db.query(query) 
            .then(mat => {
                if(mat && mat.length) {
                    pitanja = mat;
                    return db.query(getLajkovao);
                }
                else 
                    throw new Error(`Nema materijala na predmetu ${predmetName}`)
            })
            .then(lajk => lajkovi = lajk)
            .then(() => {
                for(let i = 0; i < pitanja.length; i++) {
                    pitanja[i].lajk = 0;
                    for(let j = 0; j < lajkovi.length; j++){
                        if(pitanja[i].id === lajkovi[j].id){
                            pitanja[i].lajk = Number(lajkovi[j].lajk_dislajk) === 1 ? 1 : -1 //1 za lajk, -1 za dislajk
                            break;
                        }
                    }
                    
                }
                    //res.send(pitanja);
            })
            .then(() => {

                pitanja.forEach(pitanje => {
                    let s = pitanje.datum.toISOString().split(/T|-|:/)

                    // pitanje.datum = `${s[2]}.${s[1]}.${s[0]}. ${s[3]}:${s[4]}`
                    pitanje.datum = `${s[2]}.${s[1]}.${s[0]}. ${s[3]}:${s[4]}`
                })
            })
            .then(() => {
                return pitanja.map(obj => 
                    ({
                        info: {
                            original: obj.original,
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
                )
            })
            .then(odg => {
                return this.res.send(odg)
            })
            .catch(err => {
                console.log(err.message)
                return this.res.send("null")
            })
    }

        //prikazuje samo jedan odgovor
    prikaziOdgovor(odgovorId) {

    const q = `
        select * from komentar where id = ${odgovorId}
    `
    const getLajk = `
        select komentar_id as id, lajk_dislajk
        from lajkuje_odgovor
        where korisnik_username = '${this.user}' and komentar_id = ${odgovorId}
    `;

    const getPrilog = `
        select KOMENTAR_id, path, je_slika
        from prilog
        where komentar_id = ${odgovorId}
    `;

    let odgovor
    db.query(q)
        .then(odg => {
            if(odg && odg.length) {
                odgovor = odg[0];
                return db.query(getLajk)
            }
            else 
                throw new Error(`Odgovor nije pronadjen id = ${odgovorId}`)
        })
        .then((lajk) => {
            if(lajk.length)
                odgovor.lajk = Number(lajk.lajk_dislajk) === 1 ? 1 : -1 //1 za lajk, -1 za dislajk
            else 
                odgovor.lajk = 0
            return db.query(getPrilog)
        })
        .then(rows => {
            odgovor.prilozi = []
            for(let j = 0; j < rows.length; j++) {
                odgovor.prilozi.push(rows[j]);
            }

            let s = odgovor.datum.toISOString().split(/T|-|:/)
            odgovor.datum = `${s[2]}.${s[1]}.${s[0]}. ${s[3]}:${s[4]}`
            return this.res.send(odgovor)
        })
        .catch(err => {
            console.log(err.message)
            return this.res.send("null")
        })
    }

        //sve odgovore za jedno pitanje
    prikaziOdgovore(query, pitanjeId) {
    const getLajk = `
        select komentar_id as id, lajk_dislajk
        from lajkuje_odgovor
        where korisnik_username = '${this.user}'
    `;

    const getPrilog = `
        select KOMENTAR_id, path, je_slika
        from prilog
        where komentar_id in 
            (select id from komentar 
                where materijal_id = ${pitanjeId})
    `;

    let odgovori, lajkovi
    db.query(query)
        .then(odg => {
            if(odg && odg.length) {
                odgovori = odg;
                return db.query(getLajk)
            }
            else 
                throw new Error(`Nema odgovora za to pitanje ID=${pitanjeId}`)
        })
        .then(lajk => lajkovi = lajk)
        .then(() => {
            for(let i = 0; i < odgovori.length; i++) {
                odgovori[i].lajk = 0;
                for(let j = 0; j < lajkovi.length; j++) {
                    if(odgovori[i].id === lajkovi[j].id) {
                        //odgovori[i].lajk = true;
                        odgovori[i].lajk = Number(lajkovi[j].lajk_dislajk) === 1 ? 1 : -1 //1 za lajk, -1 za dislajk
                        break;
                    }
                }
            }
            //return this.res.send(odgovori)
        })
        .then(() => db.query(getPrilog))
        .then(rows => {
            for(let i = 0; i < odgovori.length; i++) {
                odgovori[i].prilozi = []
                for(let j = 0; j < rows.length; j++) {
                    if(odgovori[i].id === rows[j].KOMENTAR_id) {
                        odgovori[i].prilozi.push(rows[j]);
                    }
                }
            }
            //return this.res.send(odgovori)
        })
        .then(() => {

            odgovori.forEach(odgovor => {
                let s = odgovor.datum.toISOString().split(/T|-|:/)

                // pitanje.datum = `${s[2]}.${s[1]}.${s[0]}. ${s[3]}:${s[4]}`
                odgovor.datum = `${s[2]}.${s[1]}.${s[0]}. ${s[3]}:${s[4]}`
            })
            return this.res.send(odgovori)
        })
        .catch(err => {
            console.log(err.message)
            return this.res.send("null")
        })
    }
    
        //NE KORISTI SE
        //pokusavam da vratim i pitanja i odgovore u jedan kveri, sema j e pitanje.json
    prikaziPitanjaSaOdg(query, predmetName) {

        //console.log(this.user)

        const getLajkovao = `
            select m.id
            from materijal m join lajkuje l on m.id = l.materijal_id 
            where predmet_id = (select id from predmet where naziv = '${predmetName}') 
                and l.korisnik_username = '${this.user}'
        `; 
                

        let pitanja, lajkovi, odgovori
        db.query(query) 
            .then(mat => {
                if(mat && mat.length) {
                    pitanja = mat;
                    return db.query(getLajkovao);
                }
                else 
                    throw new Error(`Nema materijala na predmetu ${predmetName}`)
            })
            .then(lajk => {
                if(lajk && lajk.length) {
                    lajkovi = lajk;
                    //return db.close();
                }
            })
            .then(() => {
                for(let i = 0; i < pitanja.length; i++) {
                    pitanja[i].lajk = false;
                    for(let j = 0; j < lajkovi.length; j++){
                        if(pitanja[i].id === lajkovi[j].id){
                            pitanja[i].lajk = true;
                            break;
                        }
                    }
                    
                }
                    //res.send(pitanja);
            })
            .then(() => {

            })
            .then(() => {
                return pitanja.map(obj => 
                    ({
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
                            data: obj.tekst
                        },
                        prilozi: obj.prilozi ? obj.prilozi : []
                    })
                )
            })
            .then(odg => {
                return this.res.send(odg)
            })
            .catch(err => {
                console.log(err.message)
                return this.res.send("null")
            })
        }

        // NE KORISTI SE
        // Staro (kad su pitanja imala priloge i kad se radilo sa oficial answer) 
    prikaziPitanjaSaPrilogom(query, predmetName) {

        //console.log(this.user)

        const getLajkovao = `
            select m.id
            from materijal m join lajkuje l on m.id = l.materijal_id 
            where predmet_id = (select id from predmet where naziv = '${predmetName}') 
                and l.korisnik_username = '${this.user}'
        `; 
                
        const getPrilog = `
                select p.MATERIJAL_id,  p.path, p.je_slika 
                from materijal m, prilog p
                where m.predmet_id = (select id from predmet 
                    where naziv = '${predmetName}') 
                and p.MATERIJAL_id = m.id;
        `;

        let pitanja, lajkovi;
        db.query(query) 
            .then(mat => {
                if(mat && mat.length) {
                    pitanja = mat;
                    return db.query(getLajkovao);
                }
                else 
                    throw new Error(`Nema materijala na predmetu ${predmetName}`)
            })
            .then(lajk => {
                if(lajk && lajk.length) {
                    lajkovi = lajk;
                    //return db.close();
                }
            })
            .then(() => {
                for(let i = 0; i < pitanja.length; i++) {
                    pitanja[i].lajk = false;
                    for(let j = 0; j < lajkovi.length; j++){
                        if(pitanja[i].id === lajkovi[j].id){
                            pitanja[i].lajk = true;
                            break;
                        }
                    }
                    
                }
                    //res.send(pitanja);
            })
            .then(() => {
                return db.query(getPrilog);
            })
            .then((rows) => {
                for(let i = 0; i < pitanja.length; i++) {
                    pitanja[i].prilozi = [];
                    for(let j = 0; j < rows.length; j++) {
                        if(pitanja[i].id === rows[j].MATERIJAL_id) {
                            pitanja[i].prilozi.push(rows[j]);
                        }
                    }
                }
            })
            .then(() => {
                return pitanja.map(obj => 
                    ({
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
                            data: obj.tekst
                        },
                        prilozi: obj.prilozi ? obj.prilozi : []
                    })
                )
            })
            .then(odg => {
                return this.res.send(odg)
            })
            .catch(err => {
                console.log(err.message)
                return this.res.send("null")
            })
    }


}

module.exports = Prikaz