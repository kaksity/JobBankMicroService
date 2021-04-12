const Path = require('path')
const Multer = require('multer');

//Set Up the Avatar Disk Storage
const AvatarDiskStorage = Multer.diskStorage({
    destination: './uploads/avatars/',
    filename:(req,file,cb)=>{
        cb(null,Date.now()+Path.extname(file.originalname));
    }
});

//Set up the avatar upload process
const AvatarUpload = Multer({
    storage:AvatarDiskStorage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg'){
            cb(null,true)
        }else{
            cb(null,false)
            req.error='FileType'
        }
    }
}).single('avatar');

module.exports = (req,res,next)=>{
    AvatarUpload(req,res,(err)=>{
        
        if(req.error == 'FileType'){
            return res.status(400).json({
                success:false,
                message:'Unsupported Format'
            })
        }else{
            next()
        }
    })
}