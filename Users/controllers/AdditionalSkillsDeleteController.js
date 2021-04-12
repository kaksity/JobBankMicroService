const SkillSet = require('../models/SkillSet');
module.exports = async(req,res)=>{
    try {
        let ID = req.params.id;
        let ProfileID = req.user.ProfileId;
        
        //Check if the Given Query Exist
        try {
            let result = await SkillSet.findOne({
                where:{
                    id:ID,
                    user_profile_id:ProfileID
                }
            });

            if(!result){
                return res.status(400).json({
                    success:false,
                    message:'The ID given is invalid'
                });
            }

            try {
                await SkillSet.destroy({
                    where:{
                        id:ID
                    }
                });
                return res.status(200).json({
                    success:true,
                    message:'Additional Information was deleted successfully'
                });   
            } catch (e) {
                return res.status(500).json({
                    success:false,
                    message:'Something went wrong. Try again'
                });
            }
        } catch (e) {
            return res.status(500).json({
                success:false,
                message:'Something Went wrong. Try again'
            });
        }
    } catch (e) {
        return res.status(500).json({
            success:false,
            message:'You must supply ID of the SkillSet by adding /id'
        });
    }
}