const validator = require('validator');
const Skill = require('../models/Skill');
const SkillSet = require('../models/SkillSet');
module.exports = async(req,res)=>{
    try {
        let ProfileID = req.user.ProfileId;
        let SkillID = req.body.id;
        let SkillName=req.body.name;

        if(validator.isEmpty(SkillID)){
            return res.status(400).json({
                success:false,
                message:'Skill ID is required'
            });
        }

        if(validator.isEmpty(SkillName) == true && SkillID == '19'){
            return res.status(400).json({
                success:false,
                message:"Skill Name for is Required"
            });
        }

        //Use the Skill ID to check if the ID given is valid
        let result = await Skill.findOne({
            where:{
                id:SkillID
            }
        });

        if(!result){
            return res.status(400).json({
                success:false,
                message:'Invalid Skill ID'
            });
        }

        let DataToBeSave;

        if(SkillID == '19'){
            DataToBeSave = {
                user_profile_id:ProfileID,
                skill_id:result.id,
                skill_name:result.skill +' ( '+SkillName+' )',
 
            };
        }else{
            DataToBeSave = {
                
                user_profile_id:ProfileID,
                skill_id:result.id,
                skill_name:result.skill,
                
            };
        }

        try{
            let result = await SkillSet.create({
                skill_id:DataToBeSave.skill_id,
                skill_name:DataToBeSave.skill_name,
                user_profile_id:DataToBeSave.user_profile_id
            });

            return res.status(201).json({
                success:true,
                message:'New Skillset was created Successfully'
            });
        }catch(e){
            return res.status(500).json({
                success:false,
                message:'Something went Wrong. Try again'
            });
        }

    } catch (e) {
        return res.status(500).json({
            success:false,
            message:'The following request bodies are required. id is required'
        });
    }
}