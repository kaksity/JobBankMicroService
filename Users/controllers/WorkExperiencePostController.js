const validator = require('validator');
const WorkExperience = require('../models/WorkExperience');
module.exports = async(req,res)=>{
    
    try {
        let ProfileID = req.user.ProfileId;

        let AdditionalInformation = req.body.addtional_information;
        let CurrentWork = req.body.current_work;
        let Description = req.body.description;
        let EndDate = req.body.end_date;
        let JobTitle = req.body.job_title;
        let Organisation = req.body.organisation;
        let StartDate = req.body.start_date;


        if(validator.isEmpty(JobTitle)){
            return res.status(400).json({
                success:false,
                message:'Job Title is required'
            });
        }
        else if(validator.isEmpty(Organisation)){
            return res.status(400).json({
                success:false,
                message:'Employer Name (Organization) is required'
            });
        }
        else if(validator.isEmpty(Description)){
            return res.status(400).json({
                success:false,
                message:'Job Description is required'
            });
        }
        else if(validator.isEmpty(CurrentWork)){
            return res.status(400).json({
                success:false,
                message:'Currently Work is required'
            });
        }
        else if(validator.isEmpty(StartDate)){
            return res.status(400).json({
                success:false,
                message:'Start Date is required'
            });
        }
        else if(validator.isEmpty(EndDate)){
            return res.status(400).json({
                success:false,
                message:'Stop Date is required'
            });
        }
        //Capitalize the Current Work
        CurrentWork = CurrentWork.toUpperCase();

        if(CurrentWork != 'YES' && CurrentWork != 'NO'){
            return res.status(400).json({
                success:false,
                message:'Currently Working must be Yes Or No'
            });
        }

        //Just Save the data as how the user input the data
        try {
            let result = await WorkExperience.create({
                additional_info:AdditionalInformation,
                current_work:CurrentWork,
                description:Description,
                end_date:EndDate,
                job_title:JobTitle,
                organisation:Organisation,
                start_date:StartDate,
                user_profile_id:ProfileID
            });

            return res.status(201).json({
                success:true,
                message:'New Work Experience was added successfully'
            });
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                success:false,
                message:'Something Went Wrong. Try Again'
            });
        }
    } catch (e) {
        return res.status(500).json({
            success:false,
            message:'The Following Request bodies are required  additional_information, current_work, description, end_date, job_title, organisation & start_date '
        });
    }
    
}