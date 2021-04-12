const validator = require('validator');
const UserInfo = require('../models/UserInfo');
const bcrypt = require('bcryptjs');
const GeneralFunctions = require('../functions/GeneralFunctions');

module.exports = async(req,res)=>{
/**
 * This is a controller that is going to be responsible for the long of the user into the system
 */

 try{
    let EmailAddress = req.body.email_address;
    let Password = req.body.password;

    //Check if the Email Address and password are all empty
    if(validator.isEmpty(EmailAddress)){
        return res.status(400).json({
            success:false,
            message:'Email address is required'
        });
    }
    else if(validator.isEmpty(Password)){
        return res.status(400).json({
            success:false,
            message:'Password is required'
        });
    }

    //Check if the email address is a valid email address
    if(validator.isEmail(EmailAddress) == false){
        return res.status(400).json({
            success:false,
            message:'Email address is invalid'
        });
    }

    try {
        //Make the EmailAddress to be lower case
        EmailAddress = EmailAddress.toLowerCase();

        let result = await UserInfo.findOne({
            where:{
                email_address:EmailAddress
            }
        });        

        //User does not exist in the database
        if(!result){
            return res.status(400).json({
                success:false,
                message:'Invalid Login Credentials'
            });
        }

        
        let isPasswordValid = await bcrypt.compare(Password,result.password);
        
        if(isPasswordValid ==  false){
            return res.status(400).json({
                success:false,
                message:'Invalid Login Credentials'
            });
        }

        let data = {
            ProfileId:result.profile_id,
            UserId:result.id
        };

        return res.status(200).json({
            success:true,
            message:'Login was successful',
            data:{
                token:GeneralFunctions.signToken(data)
            },
            _links:[
                {
                    link:'/api/v1/user/profile',
                    method:'GET',
                    description:'This is api endpoint gets the data of the profile of the user'
                },{
                    link:'/api/v1/user/profile',
                    method:'PUT',
                    description:'This is api endpoint update the data of the profile of the user'
                },{
                    link:'/api/v1/user/work-experience',
                    method:'GET',
                    description:'This is api endpoint gets the data of the work-experience of the user'
                },{
                    link:'/api/v1/user/work-experience',
                    method:'PUT',
                    description:'This is api endpoint update the data of the work experience of the user'
                },{
                    link:'/api/v1/user/additional-information',
                    method:'GET',
                    description:'This is api endpoint gets the data of the additional information of the user'
                },{
                    link:'/api/v1/user/additional-information',
                    method:'PUT',
                    description:'This is api endpoint gets the update of the additional information of the user'
                }
                
            ]
        });
    } catch (e) {
        return res.status(500).json({
            success:false,
            message:'Something went wrong. Try again'
        });
    }
 }
 catch(e){
    return res.status().json({
        success:false,
        message:'The following json request bodies are required for this endpoint email_address & password'
    });
 }
}