const WorkExperience = require('../models/WorkExperience');
module.exports = async(req,res)=>{
    let ProfileID = req.user.ProfileId;

    try{
        let result = await WorkExperience.findAll({
            where:{
                user_profile_id:ProfileID
            }
        })

        let data = [];

        result.forEach(element => {
            data.push({
                id:element.id,
                job_title:element.job_title,
                employer: element.organisation,
                additional_information:element.additional_info,
                start_date:new Date(element.start_date).toISOString().substr(0, 10),
                end_date:new Date(element.end_date).toISOString().substr(0, 10)
            });
        });

        return res.status(200).json({
            success:true,
            message:'Retrieved the Work Experience Successfully',
            data:data,
            links:[
                {
                    link:'/api/v1/user/work-experiences',
                    method:'POST',
                    description:'Adds a new data to the work-experience endpoint'
                },
                {
                    link:'/api/v1/user/work-experiences/:id',
                    method:'DELETE',
                    description:'Deletes a work-experience. You must also supply the ID'
                }
            ]
        });
    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:'Something Went wrong. Try again'
        });
    }
}