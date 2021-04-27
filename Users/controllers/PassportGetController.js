const Profile = require('../models/Profile')
module.exports = async(req, res) => {
    let ProfileId = req.user.ProfileId;

    try {
        let result = await Profile.findOne({
            where: {
                id: ProfileId
            }
        });

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'The profile with the given ID does not exist'
            })
        }

        let IconURL = `http://${process.env.HOSTNAME}:${process.env.PORT}/uploads/avatars/icon.png`
        return res.status(200).json({
            success: true,
            message: 'Passport was retrieved successfully',
            data: {
                link: result.avatar_url == null ? IconURL : result.avatar_url,
            }
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again'
        });
    }

}