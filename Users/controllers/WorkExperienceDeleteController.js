const WorkExperience = require('../models/WorkExperience');
module.exports = async(req,res)=>{
    try {
        
        let ProfileID = req.user.ProfileId;
        let WorkExperienceID = req.params.id;

        try {

            let result = await WorkExperience.findAll({
                where:{
                    id:WorkExperienceID,
                    user_profile_id:ProfileID
                }
            });

            if(result.length == 0){
                return res.status(400).json({
                    success:false,
                    message:'The ID given is invalid'
                });
            }

            try {
                await WorkExperience.destroy({
                    where:{
                        id:WorkExperienceID
                    }
                });
                return res.status(200).json({
                    success:true,
                    message:'Work Experience was deleted successfully'
                });
            } catch (e) {
                console.log(e)
                return res.status(500).json({
                    success:false,
                    message:'Something went wrong. Try again'
                });
            }
        } catch (e) {
            return res.status(500).json({
                success:false,
                message:'Something Went Wrong. Try again'
            });
        }
    } catch (e) {
        return res.status(500).json({
            success:false,
            message:'You Must Supply an ID /:id'
        });
    }    
}