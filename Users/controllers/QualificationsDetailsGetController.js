const validator = require('validator');
const Education = require('../models/Education');
const EducationLevel = require('../models/EducationLevel');
const Qualification = require('../models/Qualification');

module.exports = async(req,res)=>{
    try{
        let QualificationID = req.params.id;
        let ProfileID = req.user.ProfileId;

        if(validator.isEmpty(QualificationID)){
            return res.status(400).json({
                success:false,
                message:'You must supply the Qualifications ID'
            });
        }

        try {
            let result = await Education.findOne({
                where:{
                    id:QualificationID,
                    user_profile_id:ProfileID
                },
                include:[
                    {
                        model:EducationLevel
                    },{
                        model:Qualification
                    }
                ]
            });

            if(!result){
                return res.status(404).json({
                    success:false,
                    message:'The Qualification record with this ID does not exist'
                });
            }

            return res.status(200).json({
                success:true,
                message:'Qualification was retrieved Successfully',
                data:{
                    id:result.id,
                    additional_info: result.additional_info == null ?'':result.additional_info,
                    completed:result.completed,
                    course_name:result.course_name,
                    graduation_date: new Date(result.end_date).toISOString().substr(0,10),
                    grade: result.grade,
                    school_name:result.school_name,
                    admission_date: new Date(result.start_date).toISOString().substr(0,10),
                    qualification:result.education_level.name,
                    photo:result.qualification.file_url
                }
            })
        } catch (e) {
            return res.status(500).json({
                success:false,
                message:'Something went wrong. Try again'
            });
        }
        
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:'You must supply the qualifications ID'
        });
    }
}