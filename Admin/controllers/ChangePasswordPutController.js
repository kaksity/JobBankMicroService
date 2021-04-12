const Validator = require('validator');
const UserInfo = require('../models/UserInfo');
const Bcrypt = require('bcryptjs');


module.exports = async(req,res) => {
    try {
        let AdminID = req.admin.id;

        let OldPassword = req.body.old_password;
        let NewPassword = req.body.new_password;
        let ConfirmPassword = req.body.confirm_password;        

        if(Validator.isEmpty(OldPassword)){
            return res.status(400).json({
                success:false,
                message:'Old Password is required'
            });
        } else if (Validator.isEmpty(NewPassword)){
            return res.status(400).json({
                success:false,
                message:'New Password is required'
            });
        } else if(Validator.isEmpty(ConfirmPassword)){
            return res.status(400).json({
                success:false,
                message:'Confirm Password is required'
            });
        }

        try {
            let result = await UserInfo.findOne({
                where:{
                    id:AdminID
                }
            });

            if(!result){
                return res.status(404).json({
                    success:false,
                    message:'This Admin record does not exist'
                });
            }

            let isPasswordValid = await Bcrypt.compare(OldPassword,result.password);
            
            if(isPasswordValid === false){
                return res.status(400).json({
                    success:false,
                    message:'Old Password is incorrect'
                });
            }

            let HashedPassword = await Bcrypt.hash(NewPassword,10);
            result.password = HashedPassword;
            
            await result.save();

            return res.status(200).json({
                success:true,
                message: 'Password was changed successfully'
            });
        } catch (e) {
            return res.status(500).json({
                success:false,
                message:'Something went wrong. Try again.'
            });
        }
    } catch (e) {
        return res.status(500).json({
            success:false,
            message:'The Following request bodies are required. old_password, new_password && confirm_password'
        });
    }
}