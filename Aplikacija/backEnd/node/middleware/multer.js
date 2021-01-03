const multer = require('multer');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname)
    }
  })

  var upload = multer({ storage: storage })

  module.exports = upload

  // -------------------------------------------------------------------------
  //PRIMER ZA UPLOAD ENDPOINT (prekopirati u Prilog.js ako ima problema)
  // --------------------------------------------------------------------------
  // router.post('/upload', upload.array('files', 12), (req, res, next) => {
  //   const files = req.files
  //   if (!files) {
  //     const error = new Error('Please choose files')
  //     error.httpStatusCode = 400
  //     return next(error)
  //   }
  
  //     res.send(files)
  
  // })
  //----------------------------------------------------------------------------