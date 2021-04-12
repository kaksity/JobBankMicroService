const Profile = require('../models/Profile');
const EducationLevel = require('../models/EducationLevel')

module.exports = async(req,res)=>{
    let ProfileId = req.user.ProfileId;

    //Use the Get the Profile Record
    try {
        let result = await Profile.findOne({
            where:{
                id:ProfileId
            }
        });

        if(!result){
            return res.status(404).json({
                success:false,
                message:'The Profile Details where not Found'
            });
        }

        let HighestQualificationResult = await EducationLevel.findOne({
            where:{
                name:result.highest_education_level
            }
        });
        
        let data = {
            first_name:result.firstname,
            middle_name:result.middlename == null ?'':result.lastname,
            last_name:result.lastname,
            phone_number:result.phone == null ?'':result.phone,
            dob:result.dob == null ?'':new Date(result.dob).toISOString().substr(0, 10),
            gender: result.dob == null ?'':result.gender,
            highest_education_level:result.highest_education_level == null ?'':HighestQualificationResult.id,
            marital_status:result.marital_status == null?'':result.marital_status,
            employment_status:result.employment_status == null?'':result.employment_status,
            lga:result.lga_id == null ? '':result.lga_id,
            contact_address: result.contact_address == null ?'':result.contact_address,
            additional_info:result.additional_info == null?'':result.additional_info,

        };

        return res.status(200).json({
            success:true,
            message:'User Profile Detail was retrieved Successfully',
            data:data,
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success:false,
            message:'Something went wrong. Try again'
        });
    }
}