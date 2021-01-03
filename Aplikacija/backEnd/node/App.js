//expres inicijalizacija (aplikacija)
const express = require("express");
const app = express();

const logger = require('./middleware/logger')
const cors = require("cors");

//setting za multer
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use("/uploads", express.static('uploads'));

//middelwares
app.use(express.json());
app.use(cors());
app.use(logger)
//app.use(express.urlencoded({ extended: false })) //ovo zeza multer

//rute
app.use('/korisnik', require('./routes/Korisnik'))
app.use('/nastavnici', require('./routes/Nastavnik'))
app.use('/prilog', require('./routes/Prilog'))
app.use('/blanketi/pitanja', require('./routes/Pitanja'))
app.use('/blanketi/odgovori', require('./routes/Odgovori'))
app.use('/moderator', require('./routes/Moderator'))
app.use('/admin', require('./routes/Admin'))
app.use('/arhivaBlanketa', require('./routes/ArhivaBlanketa'))
app.use('/skripte', require('./routes/Skripte'))
app.use("/report", require('./routes/Report'))
app.use("/forum", require('./routes/Forum'))
app.use("/kviz", require('./routes/Kviz'))
//app.use('/unregistred/blanketi', require('./routes/Unregistred')) //trenutno ne koristimo

//za renderovanje html
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')

//welcome page
app.get("/", (req, res)=>{
    res.send({text: "Uspesno sto uspostavili vezu sa serverom."});
})

//proba za datum
const DateNow = require('./classes/DateNow')
console.log("Server start: " + new DateNow().toString())

// let s = "2018-05-12T07:36:50.000Z".split(/T|-|:/)
// const string = `${s[2]}.${s[1]}.${s[0]}. ${s[3]}:${s[4]}`
// // [2].concat(`.${s[1]}.${s[0]}. ${s[3]}:${s[4]}`)
// console.log(string)

app.get("/proba", (req, res) => {
    const pitanje = [
        {
            "question": {
                "year": "2018",
                "exam": "januar",
                "number": 1,
                "text": "Šta je softver i čime se bavi softversko inženjerstvo? Koje tipove softvera imamo?"
            },
            "info": {
                "id": 1,
                "user": "darjan",
                "likes": 2,
                "isLiked": true,
                "datum": "2019-02-12T13:32:34.000Z"
            },
            "promotedAnswer": {
                "id": 24,
                "tekst": "probni odgovor 1",
                "broj_lajkova": 0,
                "datum": "2019-06-27T15:25:12.000Z",
                "promoted": 1,
                "KORISNIK_username": "batabane",
                "MATERIJAL_id": 1,
                "lajk": false,
                "prilozi": [
                    {
                        "KOMENTAR_id": 27,
                        "path": "uploads/1561641451332Screenshot_3.png",
                        "je_slika": 1
                    },
                    {
                        "KOMENTAR_id": 27,
                        "path": "uploads/1561641451333Vremenska tabela.jpg",
                        "je_slika": 1
                    },
                    {
                        "KOMENTAR_id": 27,
                        "path": "uploads/1561641451332Screenshot_3.png",
                        "je_slika": 1
                    },
                    {
                        "KOMENTAR_id": 27,
                        "path": "uploads/1561641451333Vremenska tabela.jpg",
                        "je_slika": 1
                    },
                    {
                        "KOMENTAR_id": 27,
                        "path": "uploads/1561641451332Screenshot_3.png",
                        "je_slika": 1
                    },
                    {
                        "KOMENTAR_id": 27,
                        "path": "uploads/1561641451333Vremenska tabela.jpg",
                        "je_slika": 1
                    }
                ]
            },
            "answers": 
            [
                {
                    "id": 27,
                    "tekst": "probni odgovor 1",
                    "broj_lajkova": 0,
                    "datum": "2019-06-27T15:25:12.000Z",
                    "promoted": 1,
                    "KORISNIK_username": "batabane",
                    "MATERIJAL_id": 1,
                    "lajk": false,
                    "prilozi": [
                        {
                            "KOMENTAR_id": 27,
                            "path": "uploads/1561641451332Screenshot_3.png",
                            "je_slika": 1
                        },
                        {
                            "KOMENTAR_id": 27,
                            "path": "uploads/1561641451333Vremenska tabela.jpg",
                            "je_slika": 1
                        }
                    ]
                },
                {
                    "id": 27,
                    "tekst": "probni odgovor 1",
                    "broj_lajkova": 0,
                    "datum": "2019-06-27T15:25:12.000Z",
                    "promoted": 0,
                    "KORISNIK_username": "batabane",
                    "MATERIJAL_id": 1,
                    "lajk": false,
                    "prilozi": [
                        {
                            "KOMENTAR_id": 27,
                            "path": "uploads/1561641451332Screenshot_3.png",
                            "je_slika": 1
                        },
                        {
                            "KOMENTAR_id": 27,
                            "path": "uploads/1561641451333Vremenska tabela.jpg",
                            "je_slika": 1
                        }
                    ]
                } 
            ]
        }
    ]

    res.send(pitanje)
})

//port 6000 je rezervisan iz nekog razloga pa ne moze da se koristi
let port = Number(process.argv[2])
if(isNaN(port)) port = 4000 //ako nije prosledjen kao parametar u konzolu (Darjan koristi port 4000)

app.listen(port, ()=>{console.log(`Listening on port ${port}...`)});