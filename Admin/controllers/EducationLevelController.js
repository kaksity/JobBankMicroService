const EducationLevel = require('../models/EducationLevel');

module.exports = async(req,res)=>{
    try{
        let result = await EducationLevel.findAll();
        
        let data = [];

        result.forEach(element => {
            data.push({
                id:element.id,
                name:element.name
            });
        });
        return res.status(200).json({
            success:true,
            message:'Retrieved List of Education Level',
            data:data
        });
    }catch(e){
        return res.status(500).json({
            success:false,
            message:'Something went wrong. Try again',
        });
    }
}