const Profile = require('../models/Profile');
const LGA = require('../models/LGA');
const SkillSet =require('../models/SkillSet');
const Education = require('../models/Education');
const Sequelize = require('sequelize');
module.exports = async(req,res) => {
    try {
        let CompletedProfile = await Profile.findAll({
            where:{
                profile_completed:true
            }
        });

        let UncompletedProfile = await Profile.findAll({
            where:{
                profile_completed:false,
            }
        });
        let LGAData = await LGA.findAll();
        let SkillSetData = await SkillSet.findAll();
        let FirstClassData = await Education.findAll({
            where:{
                grade:'FIRST CLASS'
            }
        });
        let UpperCreditData = await Education.findAll({
            where:{
                grade:'UPPER CREDIT'
            }
        });
        let LowerCreditData = await Education.findAll({
            where:{
                grade:'LOWER CREDIT'
            }
        });
        let OthersData = await Education.findAll({
            where:{
                [Sequelize.Op.not]:{
                    grade:['FIRST CLASS','UPPER CREDIT','LOWER CREDIT']
                }
            }
        });
        return res.status(200).json({
            success:true,
            data:{
                profile:{
                    completed_profile:CompletedProfile.length,
                    uncompleted_profile:UncompletedProfile.length,
                    lga:LGAData.length,
                    skill_set:SkillSetData.length,
                },
                grade:{
                    first_class:FirstClassData.length,
                    upper_credit:UpperCreditData.length,
                    lower_credit:LowerCreditData.length,
                    others:OthersData.length,
                },
                qualifications:{

                }
            }
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success:false,
            message:'Something went wrong. Try again'
        });
    }    
}