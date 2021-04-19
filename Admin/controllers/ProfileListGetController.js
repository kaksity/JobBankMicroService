const Profile = require('../models/Profile');
const LGA = require('../models/LGA');
const Validator = require('validator');
module.exports = async(req,res) => {
    try {

        const Type = req.query.type;
	const Page = req.query.page;
	const Size = req.query.size;

        //Some Simple Validation
        QueryParams = {};

        if(Type == undefined || Page == undefined || Size == undefined){
            return res.status(400).json({
                success:false,
                message:'You must add a query parameter with the type, page & size'
            });
        }else if(Validator.isEmpty(Type) || (Type != 'true' && Type != 'false')){
            return res.status(400).json({
                success:false,
                message:'type must be true or false'
            });
        }else if (Validator.isEmpty(Page) || isNaN(Page) == true){
        	return res.status(400).json({
               success:false,
            	message:'Page is required and must be numeric'
       	});
        }
        else if (Validator.isEmpty(Size) || isNaN(Size) == true){
        	return res.status(400).json({
               success:false,
            	message:'Size is required and must be numeric'
       	});
        }
	else if (Size > 1000){
        	return res.status(400).json({
               success:false,
            	message:'Maximun Allowable Page Size is 1000'
       	});
        }

        const OffSet = (Page - 1 ) * Size;

        let result = await Profile.findAndCountAll({
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
            offset:OffSet,
            limit:Size
        });


	let TotalNumberOfRecord = result.count;

	let TotalNumberOfPages =  Math.floor(TotalNumberOfRecord / Size);

	if(TotalNumberOfRecord % Size != 0){
		TotalNumberOfPages=TotalNumberOfPages+1;
	}

	let DataResult = result.rows;

        let data = [];

        DataResult.forEach(element => {
            data.push({
                id:element.id,
                full_name:`${element.firstname} ${element.lastname} ${(element.middlename) != null ? element.middlename : ''}`,
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
                total_number_record:TotalNumberOfRecord,
                total_number_pages:TotalNumberOfPages,
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
