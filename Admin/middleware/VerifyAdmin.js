const UserRole = require('../models/UserRole');

module.exports = async(req,res,next)=>{
    try {
    
        let AdminID = req.admin.id;

        if(!AdminID){
            return res.status(401).json({
                message:'You must log in as Admin',
                success:false,
            });
        }

        let result = await UserRole.findOne({
            where:{
                user_id:AdminID
            }
        });

        if(!result || result.role_id != 2){
            return res.status(401).json({
                message:'You must log in as Admin',
                success:false,
            });
        }
        next();
    }catch (e) {
        return res.status(500).json({
            success:false,
            message:'Something went wrong. Try again'
        });    
    }
}