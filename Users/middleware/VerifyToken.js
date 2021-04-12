const jwt = require('jsonwebtoken');

module.exports = async (req,res,next)=>{
    try{
    
        const AuthHeader = req.headers.authorization;
        
        if(!AuthHeader){
            return res.status(401).json({
                success:false,
                message:'Access Denied. Log In is required',
                _links:{
                    link:'/api/v1/user/login',
                    method:'POST',
                    description:'This is to get a new JWT token'
                }
            });
        }

        let data = await jwt.verify(AuthHeader,process.env.JWT_SECRET_KEY);
        req.user = data
        next();
    } catch (e) {
        return res.status(401).json({
            success:false,
            message:'Token has been tampered with',
            _links:{
                link:'/api/v1/user/login',
                method:'POST',
                description:'This is to get a new JWT token'
            }
        });
    }
}