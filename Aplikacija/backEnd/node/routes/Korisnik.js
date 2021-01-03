const passwordHash = require("password-hash");
const Database = require('../classes/Database')
const db = new Database();

const express = require('express')
const router = express.Router();
const upload = require('../middleware/multer')

router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const nadjiKorisnika = `SELECT * FROM korisnik WHERE username = '${username}'`;

    db.query(nadjiKorisnika)
        .then(results => results[0])
        .then(korisnik => {
            if(korisnik != null) {
                const temp = {
                    username: korisnik.username,
                    tip: korisnik.tip

                }
                if(passwordHash.verify(password, korisnik.password)) {
                    console.log(`${korisnik.tip} ${korisnik.username} se prijavio na sistem.`)
                    res.json(temp)
                } else {
                    console.log("Pogresna sifra")
                    res.send("1") //za password
                }
            }
            else {
                console.log("Pogresan username")
                res.send("2")
            }
        })
        .catch(err => console.log(err))
})

router.post("/registracija", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const ime = req.body.ime; 
    const prezime = req.body.prezime;
    const email = req.body.email;

    const hashedPassword = passwordHash.generate(password);
    const dodajKorisnika = `
        INSERT INTO korisnik (username, password, ime, prezime, email, tip) VALUES
        ('${username}', '${hashedPassword}', '${ime}', '${prezime}', '${email}', 'obican')
        `;
    
        db.query(dodajKorisnika)
        .then(() => {
            console.log(`Registrovan novi korisnik ${username}.`)
            res.send("1");
        })
        .catch(() => {
            console.log(`Korisnik ${username} vec postoji.`)
            res.send("2");
        })
});

router.get("/pregled/:username", (req, res) => {
    const username =  req.params.username;
    const q = `
        select * from korisnik
        where username = '${username}' `;

    db.query(q)
        .then(row => {
            if(row.length) {
                return res.send(row[0]);
            }
        })
})

router.post("/promeniSifru", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const novaSifra = req.body.newPassword;

    const hashedPassword = passwordHash.generate(password);
    const hashedNewPassword = passwordHash.generate(novaSifra);

    const proveraSifre = `
        select password 
        from korisnik 
        where username = '${username}'
    `;

    const promenaSifre = `
        update korisnik
        set password = '${hashedNewPassword}'
        where username = '${username}'
    `;

    db.query(proveraSifre) 
        .then(result => {
            if(result.length)
                return result[0]
            else
                throw new Error(2) // korisnik nije pronadjen
        })
        .then(korisnik => {
            if(passwordHash.verify(password, korisnik.password)) {
                return db.query(promenaSifre);
            } else {
                throw new Error(3) //pogresna stara sifra
            }
        })
        .then((result) => {
            if(result.changedRows === 1) {
                console.log(`Korisnik ${username} promenio sifru`)
                res.send("1") //sifra uspesno promenjena
            }
        })
        .catch((err) => {
            switch (err.message) {
                case "2" : {
                    console.log(`Korisnik ${username} nije pronadjen.`)
                    break
                }
                case "3" : {
                    console.log(`Korisnik ${username} nije promenio sifru jer je uneo pogresnu sifru`) 
                    break
                }
            }
            res.status(400).send(err.message)
        })

})

router.post("/promeniUsername", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const noviUsername = req.body.newUsername;


    const proveraSifre = `
        select password 
        from korisnik 
        where username = '${username}'
    `;

    const promenaUsername = `
        update korisnik
        set username = '${noviUsername}'
        where username = '${username}'
    `;

    db.query(proveraSifre) 
        .then(result => {
            if(result.length)
                return result[0]
            else
                throw new Error(2) // korisnik nije pronadjen
        })
        .then(korisnik => {
            if(passwordHash.verify(password, korisnik.password)) {
                return db.query(promenaUsername);
            } else {
                throw new Error(3) //pogresna stara sifra
            }
        })
        .then((result) => {
            if(result.changedRows === 1) {
                console.log(`Korisnik ${username} promenio sifru`)
                res.send("1") //username uspesno promenjen
            }
        })
        .catch((err) => {
            switch (err.message) {
                case "2" : {
                    console.log(`Korisnik ${username} nije pronadjen.`)
                    break
                }
                case "3" : {
                    console.log(`Korisnik ${username} nije promenio username jer je uneo pogresnu sifru`) 
                    break
                }
            }
            res.status(400).send(err.message)
        })

})

router.post("/dodajSliku", upload.single("photo"), (req, res) => {
        const username = req.body.username;
        let pom = req.file.path.split("\\");
        let path = pom[0] + '/' + pom[1];
        const q = `UPDATE korisnik SET path = '${path}'
                     WHERE username = '${username}'`;
        db.query(q)
        .then((rows) => {
            console.log(rows);
            res.send(path);
        })
        .catch(err => {
            console.log(err);
        })
})

router.post("/promeniImePrezime", (req, res) => {
    const ime = req.body.name;
    const prezime = req.body.surname;
    const username = req.body.username;
    const query = `update korisnik 
                set ime = '${ime}', prezime = '${prezime}'
                where username = '${username}'`
    db.query(query)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        })
})

// router.post("/promeniPrezime", (req, res) => {
//     const username = req.body.username;
//     const query = `update korisnik 
//                 set prezime = '${prezime}'
//                 where username = '${username}'`
//     db.query(query)
//         .then(result => {
//             res.send(result);
//         })
//         .catch(err => {
//             res.send(err);
//         })
// })

router.post("/promeniEmail", (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const query = `update korisnik 
                set email = '${email}'
                where username = '${username}'`
    db.query(query)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        })
})



module.exports = router