const db = require('../config/db');
const Education = require('../models/Education');
const Qualification = require('../models/Qualification');

module.exports = async(req,res)=>{

    try {
        
        let ProfileId = req.user.ProfileId;
        let EducationId = req.params.id;
        const transaction = await db.transaction();

        try {
            let EducationResult = await Education.findOne({
                where:{
                    id:EducationId,
                    user_profile_id:ProfileId
                }
            })

            if(!EducationResult){
                return res.status(404).json({
                    success:false,
                    message:'Qualification was not Found'
                })
            }

            await Qualification.destroy({
                where:{
                    education_id:EducationResult.id
                }
            },{
                transaction:transaction
            });

            await Education.destroy({
                where:{
                    id:EducationId
                },
            },{
                transaction:transaction
            })

            await transaction.commit();

            return res.status(200).json({
                success:true,
                message:'Qualification was deleted successfully'
            })
        } catch (e) {
            await transaction.rollback();
            return res.status(500).json({
                success:false,
                message:'Something went wrong. Try again'
            });
        }
        //Using the Profile ID get the Qualification
    } catch (e) {
        return res.status(500).json({
            success:false,
            message:'Something went wrong. Try again',
        })
    }
}