const Profile = require('../models/Profile');
const EducationLevel = require('../models/EducationLevel');
const validator = require('validator');
module.exports = async(req,res) =>{
    let ProfileId = req.user.ProfileId;
    let UserId = req.user.UserId
    try {
        let MiddleName = req.body.middle_name;
        let PhoneNumber = req.body.phone_number;
        let DateOfBirth = req.body.date_of_birth;
        let Gender = req.body.gender;
        let HighestEducationLevel = req.body.highest_education_level;
        let MaritalStatus = req.body.marital_status;
        let EmploymentStatus = req.body.employment_status;
        let LGA = req.body.lga;
        let ContactAddress = req.body.contact_address;
        let AdditionalInfo = req.body.additional_info;

        if(validator.isEmpty(PhoneNumber)){
            return res.status(400).json({
                success:false,
                message:'Phone Number is required',
            });
        }else if(validator.isEmpty(DateOfBirth)){
            return res.status(400).json({
                success:false,
                message:'Date of Birth is required',
            });
        }else if(validator.isEmpty(Gender)){
            return res.status(400).json({
                success:false,
                message:'Gender is required',
            });
        }else if(validator.isEmpty(HighestEducationLevel)){
            return res.status(400).json({
                success:false,
                message:'Highest Qualification is required',
            });
        }else if(validator.isEmpty(MaritalStatus)){
            return res.status(400).json({
                success:false,
                message:'Marital Status is required',
            });
        }else if(validator.isEmpty(EmploymentStatus)){
            return res.status(400).json({
                success:false,
                message:'Employment Status is required',
            });
        }else if(validator.isEmpty(LGA)){
            return res.status(400).json({
                success:false,
                message:'Local Government Area is required',
            });
        }else if(validator.isEmpty(ContactAddress)){
            return res.status(400).json({
                success:false,
                message:'Contact Address is required',
            });
        }else if(PhoneNumber.length != 11){
            return res.status(400).json({
                success:false,
                message:'Phone Number must be 11 digits',
            });
        }


        try {
            let result = await Profile.findOne({
                where:{
                    id:ProfileId
                }
            });

            if(!result){
                return res.status(404).json({
                    success:false,
                    message:'User Profile With the ID is not found'
                });
            }

            // Format the Data Before Keeping in the database
            Gender = Gender.toUpperCase()
            EmploymentStatus = EmploymentStatus.toUpperCase();
            MaritalStatus = MaritalStatus.toUpperCase();
            
            let EducationLevelResult = await EducationLevel.findOne({
                where:{
                    id:HighestEducationLevel
                }
            });

            if(!EducationLevelResult){
                return res.status(400).json({
                    success:false,
                    message:'Highest Education Level ID is invalid'
                })
            }

            HighestEducationLevel = EducationLevelResult.name;

            
            result.additional_info=AdditionalInfo;
            result.contact_address=ContactAddress;
            result.dob=DateOfBirth;
            result.educated=HighestEducationLevel == 'NONE'?false:true;
            result.employment_status=EmploymentStatus;
            result.gender=Gender;
            result.highest_education_level=HighestEducationLevel;
            result.marital_status=MaritalStatus;
            result.middle_name=MiddleName;
            result.phone_number=PhoneNumber;
            result.lga_id=LGA;
            result.profile_completed=true;
            result.user_id=UserId;

            await result.save();
        
            return res.status(200).json({
                success:true,
                message:'Profile was updated successfully'
            })
        } catch (e) {
            return res.status(500).json({
                success:false,
                message:'Something went wrong. Try again'
            })
        }
    } catch (e) {
        return res.status(500).json({
            success:false,
            message:'The following request bodies are required '
        })
    }
}