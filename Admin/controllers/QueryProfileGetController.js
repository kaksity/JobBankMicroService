const axios = require('axios');

module.exports = async(req,res) =>{
    const token = req.admin.token;
    try {
        let ResultHTTPEducationLevel = await axios.get(`http://${process.env.USER_SERVICE_HOST}:${process.env.USER_SERVICE_PORT}/api/v1/user/education-level`,{
            headers:{
                'authorization':token,
            }
        });

        let ResultHTTPLGA = await axios.get(`http://${process.env.USER_SERVICE_HOST}:${process.env.USER_SERVICE_PORT}/api/v1/user/lga`,{
            headers:{
                'authorization':token,
            }
        });

        return res.status(200).json({
            success:true,
            message:'Retriving profile Query parameters',
            data:[
                {
                    name:'Education Level',
                    data:ResultHTTPEducationLevel.data
                },
                {
                    name:'LGA',
                    data:ResultHTTPLGA.data
                }
            ]
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success:false,
            message:'Something went wrong. Try again'
        });
    }    
}