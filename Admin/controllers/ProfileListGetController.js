const Profile = require('../models/Profile');
const LGA = require('../models/LGA');
const Validator = require('validator');
module.exports = async(req,res) => {
    try {

        const Type = req.query.type;

        //Some Simple Validation
        QueryParams = {};
        
        if(Type == undefined){
            return res.status(400).json({
                success:false,
                message:'You must add a query parameter with the type'
            });
        }else if(Validator.isEmpty(Type) || (Type != 'true' && Type != 'false')){
            return res.status(400).json({
                success:false,
                message:'type must be true or false'
            });
        }


        let TotalNumberRecord = await Profile.findAll({
            where:{
                profile_completed:Type,
            }
        });
        
        let result = await Profile.findAll({
            attributes:['id','firstname','middlename','lastname','gender','phone','highest_education_level','lga_id','lga.name'],
            where:{
                profile_completed:Type
            },
            include:[{
                model:LGA,
                attributes:['name']
            }],
            order:[
                ['id','DESC']
            ],
        });

        let data = [];
        result.forEach(element => {
            data.push({
                id:element.id,
                full_name:`${element.firstname} ${element.lastname} ${element.middlename}`,
                gender:element.gender == null?'':element.gender,
                phone_number:element.phone == null?'':element.phone,
                highest_qualification:element.highest_education_level == null?'':element.highest_education_level,
                lga:element.lga_id == null?'':element.lga.name,
            });
        })

        return res.status(200).json({
            success:true,
            message:'Retrieved Profile Successfully',
            data:data,
            links:{
                total_number_record:TotalNumberRecord.length,
                total_number_pages:Math.floor(TotalNumberRecord.length/1000),
                items_return:data.length,
            }
        })       
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success:false,
            message:'Something went wrong. Try again'
        });
    }   
}