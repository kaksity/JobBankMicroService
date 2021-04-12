const LGA = require('../models/LGA');

module.exports = async(req,res)=>{
    
    try {
        let result = await LGA.findAll();        
        let data = []

        result.forEach(element => {
            data.push({id:element.id,name:element.name})
        });

        return res.status(200).json({
            success:true,
            message:'LGA Result was retrieved succesfully',
            data:data
        });
    } catch (e) {
        return res.status(500).json({
            success:false,
            message:'Something went wrong. Try again'
        });
    }   

    
}