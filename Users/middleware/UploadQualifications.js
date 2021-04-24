const Path = require('path')
const Multer = require('multer');

//Set Up the Avatar Disk Storage
const QualificationsDiskStorage = Multer.diskStorage({
    destination: './uploads/qualifications/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + Path.extname(file.originalname));
    }
});

//Set up the avatar upload process
const Upload = Multer({
    storage: QualificationsDiskStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg') {
            cb(null, true)
        } else {
            cb(null, false)
            req.error = 'FileType'
        }
    }
}).single('file');

module.exports = (req, res, next) => {
    Upload(req, res, (err) => {

        if (req.error == 'FileType') {
            return res.status(400).json({
                success: false,
                message: 'Unsupported Format'
            })
        } else {
            next()
        }
    })
}