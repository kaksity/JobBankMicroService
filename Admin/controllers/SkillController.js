const Skill = require('../models/Skill');
module.exports = async(req,res)=>{
    try{
        let result = await Skill.findAll();
        
        let data = [];

        result.forEach(element => {
            data.push({id:element.id, name:element.skill})    
        });

        return res.status(200).json({
            success:true,
            message:'Retrevied the list of Skills successfully',
            data:data
        });
    }catch(e){
        return res.status(500).json({
            success:false,
            message:'Something went wrong. Try again'
        });
    }
}