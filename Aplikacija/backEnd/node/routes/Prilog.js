const Database = require('../classes/Database.js')
const db = new Database();

const upload = require('../middleware/multer')

const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
  res.render('probaZaUpload.html')
})

//Uploading multiple files za pitanja i odgovore
router.post('/upload', upload.array('files', 12), (req, res, next) => {
  const id = req.body.id
  const files = req.files


  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }

  let q = `INSERT INTO PRILOG (naziv, path, je_slika, komentar_id) VALUES\n`
  files.forEach((file, i) => {
    let pom = file.path.split("\\")
    let path = pom[0] + "/" + pom[1]

    
    q += `('${file.originalname}', '${path}', ${file.mimetype.includes("image") ? 1 : 0}, ${id})`
    if(i < files.length - 1) q += ",\n"
  })


  db.query(q)
    .then(row => console.log(row))
    .catch(err => console.log(err))

})

module.exports = router

