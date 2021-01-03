const multer = require('multer');

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "../uploads/")
      },
    filename: function (req, file, cb) {        
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname )
    }
})
// Init upload
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        sanitizeFile(file, cb);
    }
})

// Handle the upload route
// app.post('/upload', (req, res) => {
//     // res.send('done');
//     upload(req, res, (err) => {
//         if (err){ 
//             res.render('index', { msg: err})
//         }else{
//             // If file is not selected
//             if (req.file == undefined) {
//                 res.render('index', { msg: 'No file selected!' })
            
//             }
//             else{
//                 res.render('index', { msg: 'File uploaded successfully!' })
//             }
//         }
    
//     })
// })

function sanitizeFile(file, cb) {
    // Define the allowed extension
    // let fileExts = ['png', 'jpg', 'jpeg', 'gif', 'doc', 'docx', 'ppt', 'pptx', 'pdf']
    let fileExts = ['png', 'jpg', 'jpeg', 'gif']
    // Check allowed extensions
    let isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase());
    // Mime type must be an image
    let isAllowedMimeType = file.mimetype.startsWith("image/")
    // let isAllowedMimeType = file.mimetype.startsWith("image/" || "application/msword" || "application/vnd" || "application/pdf")
    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true) // no errors
    }
    else {
        // pass error msg to callback, which can be displaye in frontend
        cb('Error: File type not allowed!')
    }
}

module.exports = upload