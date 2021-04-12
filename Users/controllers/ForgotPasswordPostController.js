const UserInfo = require("../models/UserInfo");
const validator = require('validator')
const db = require('../config/db');
const PasswordResetToken = require("../models/PasswordResetToken");
const Mailer = require('nodemailer');
module.exports = async(req,res)=>{
    //First Check if the Email Address Given Exist in the database
    
    try {
        let EmailAddress = req.body.email_address;

        if(validator.isEmpty(EmailAddress)){
            return res.status(400).json({
                success:false,
                message:'Email Address is required'
            });
        } else if (validator.isEmail(EmailAddress) == false){
            return res.status(400).json({
                success:false,
                message:'This Email Address is invalid'
            });
        }

        let result = await UserInfo.findOne({
            where:{
                email_address: EmailAddress
            }
        });

        if(!result){
            return res.status(404).json({
                success:false,
                message:'This Email Address does not exit in our database'
            });
        }

        //If the Email Address exist in the database
        //TODO:

        let ExpirationTime = new Date();
        ExpirationTime.setHours(new Date().getHours() + 2);

        let transaction = await db.transaction();

        try {
            
            //Check if a password reset token has been sent before

            let PasswordResetResult = await PasswordResetToken.findOne({
                where:{
                    user_id:result.id
                }
            });

            if(PasswordResetResult){
                PasswordResetResult.destroy({
                    transaction:transaction
                });
            }

            //Generate a random 6 digits token
            let token = Math.floor(Math.random() * 999999)
               
            await PasswordResetToken.create({
                expiry_date:ExpirationTime,
                token:token,
                user_id:result.id
            },{
                transaction:transaction
            })

            transaction.commit();
            return res.status(201).json({
                success:true,
                message:'An Email containing reset token has been sent to you'
            });
        } catch (e) {
            transaction.rollback();
            return res.status(500).json({
                success:false,
                message:'Something went wrong. Try again'
            });    
        }

    } catch (e) {
        return res.status(500).json({
            success:false,
            message:'The Following request bodies are required  email_address',
        });
    }
}