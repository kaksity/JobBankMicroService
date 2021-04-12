const jwt = require('jsonwebtoken');
exports.signToken = (data)=>{
    return jwt.sign(data,process.env.JWT_SECRET_TOKEN,{expiresIn:24*60*60});
}