const Profile = require('../models/Profile')
module.exports = async(req,res)=>{
    const ProfileId = req.user.ProfileId

    try {
        let result = await Profile.findOne({
            where:{
                id:ProfileId
            }
        });

        if(!result){
            return res.status(404).json({
                success:false,
                message:'Profile with the given ID does not exist'
            })
        }

        result.avatar_file_name = req.file.path
        result.avatar_url = `http://${process.env.HOSTNAME}:${process.env.PORT}/`+req.file.path

        await result.save();

        return res.status(200).json({
            success:true,
            message:'Photo was uploaded successfully'
        });
    } catch (e) {
        return res.status(500).json({
            success:false,
            message:'Something went wrong. Try again'
        })
    }
}