const validator = require('validator');
const UserInfo = require('../models/UserInfo');
const bcrypt = require('bcryptjs')
module.exports = async(req,res) => {
    try {
        let OldPassword = req.body.old_password;
        let NewPassword = req.body.new_password;
        let ConfirmPassword = req.body.confirm_password;

        if(validator.isEmpty(OldPassword)){
            return res.status(400).json({
                success:false,
                message:'Old Password is required'
            });
        }else if(validator.isEmpty(NewPassword)){
            return res.status(400).json({
                success:false,
                message:'New Password is required'
            });
        }else if(validator.isEmpty(ConfirmPassword)){
            return res.status(400).json({
                success:false,
                message:'Confirm Password is required'
            })
        }else if(OldPassword.length < 8){
            return res.status(400).json({
                success:false,
                message:'Wrong Old Password'
            });
        }else if(NewPassword.length < 8){
            return res.status(400).json({
                success:false,
                message:'New Password must be 8 or more characters'
            });
        }else if(NewPassword != ConfirmPassword){
            return res.status(400).json({
                success:false,
                message:'New Password must match Confirm New Password'
            });
        }

        //Find the User Profile Details
        UserID = req.user.UserId;
        try {
            let result = await UserInfo.findOne({
                where:{
                    id:UserID
                }
            });

            if(!result){
                return res.status(404).json({
                    success:false,
                    message:'User with this ID does not exist'
                });
            }

            //Check if the Supplied Password is correct
            let isPasswordValid = await bcrypt.compare(OldPassword,result.password)


            if(isPasswordValid == false){
                return res.status(400).json({
                    success:false,
                    message:'Wrong Old Password'
                });
            }

            let HashedPassword = await bcrypt.hash(NewPassword,10);

            result.password = HashedPassword;

            await result.save();

            return res.status(200).json({
                success:true,
                message:'Password was updated successfully'
            });
        } catch (e) {
            return res.status(500).json({
                success:false,
                message:'Something went wrong. Try again'
            });
        }
    } catch (e) {
        return res.status(500).json({
            success:false,
            message: 'The Following request bodies are required. old_password, new_password & confirm_password'
        });
    }
}