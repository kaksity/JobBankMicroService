const Skill = require('../models/Skill');
const SkillSet = require('../models/SkillSet');
module.exports = async(req,res)=>{
    let UserProfileId = req.user.ProfileId;

    try{
        
        let result = await SkillSet.findAll({
            where:{
                user_profile_id:UserProfileId
            }
        });

        let data = []

        result.forEach(element => {
            data.push({
                id:element.id,
                name:element.skill_name,
            });
        });

        return res.status(200).json({
            success:true,
            message:'Retrieved the List of Additional Skills Successfully',
            data:data,
            links:[
                {
                    link:'/api/v1/user/additional-skills',
                    method:'POST',
                    description:'This Endpoint will be used to a new Skills Set to the List of SkillSets'
                },{
                    link:'/api/v1/user/additional-skills/skill-id',
                    method:'DELETE',
                    description:'This Endpoint will be used to delete the Skill data has been added'
                }
            ]
        });
    }catch(e){
        return res.status(500).json({
            success:false,
            message:'Something went wrong. Try again'
        });
    }
}