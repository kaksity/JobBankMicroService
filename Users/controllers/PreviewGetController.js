const Profile = require('../models/Profile');
const LGA = require('../models/LGA');
const Education = require('../models/Education');
const EducationLevel = require('../models/EducationLevel');
const WorkExperience = require('../models/WorkExperience');
const SkillSet = require('../models/SkillSet');
module.exports = async(req,res) => {
    let ProfileId = req.user.ProfileId;
    try{
        let result = await Profile.findOne({
            where:{
                id:ProfileId
            },
            include:[{
                model:LGA
            },{
                model:Education,
                include:EducationLevel
            },{
                model:WorkExperience
            },{
                model:SkillSet
            }]
        })

        let ProfileData = {
            first_name:result.firstname,
            middle_name:result.middlename == null ?'':result.lastname,
            last_name:result.lastname,
            phone_number:result.phone == null ?'':result.phone,
            dob:result.dob == null ?'':new Date(result.dob).toISOString().substr(0, 10),
            gender: result.gender == null ?'':result.gender,
            highest_education_level:result.highest_education_level == null ?'':result.highest_education_level,
            marital_status:result.marital_status == null?'':result.marital_status,
            employment_status:result.employment_status == null?'':result.employment_status,
            lga:result.lga_id == null ? '':result.lga.name,
            contact_address: result.contact_address == null ?'':result.contact_address,
            additional_info:result.additional_info == null?'':result.additional_info,
            photo:result.avatar_url
        }

        let EducationData = []

        result.education.forEach(element => {
            EducationData.push({
                id:element.id,
                school_name:element.school_name,
                qualifications:element.education_level.name,
                grade:element.grade,
                admission_date:new Date(element.start_date).toISOString().substr(0,10),
                graduation_date:new Date(element.end_date).toISOString().substr(0,10)
            })
        })

        let WorkExperienceData = []
        
        result.work_experiences.forEach((element)=>{
            WorkExperienceData.push({
                id:element.id,
                job_title:element.job_title,
                employer:element.organisation,
                start_date:new Date(element.start_date).toISOString().substr(0,10),
                stop_date:new Date(element.end_date).toISOString().substr(0,10)
            })
        });

        let SkillSetData = [];

        result.skill_sets.forEach(element=>{
            SkillSetData.push({
                id:element.id,
                name:element.skill_name
            })
        })

        
        return res.status(200).json({
            success:true,
            message:'Preview was retrieved successfully',
            data:{
                profile:ProfileData,
                qualifications:EducationData,
                work_experience:WorkExperienceData,
                skill_set:SkillSetData
            }
        });
    }catch(e){
        return res.status(500).json({
            success:true,
            message:'Something went wrong. Try again'
        })
    }
}