const JWT = require('jsonwebtoken');
module.exports = async(req,res,next) => {
    try {
        let token = req.headers.authorization;
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Access Denied. Log In again'
            });
        }

        let Admin = await JWT.verify(token,process.env.JWT_SECRET_TOKEN);

        req.admin = Admin;
        next();
    } catch (e) {
        return res.status(401).json({
            success:false,
            message:'Token has been tampered with. Log In again'
        });
    }    
}