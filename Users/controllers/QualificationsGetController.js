const Education = require('../models/Education');
const EducationLevel = require('../models/EducationLevel');
module.exports = async(req, res) => {
    let ProfileId = req.user.ProfileId;

    try {
        let result = await Education.findAll({
            where: {
                user_profile_id: ProfileId
            },
            include: EducationLevel
        });

        let data = [];

        result.forEach(element => {
            data.push({
                id: element.id,
                school_name: element.school_name,
                course_name: element.course_name,
                qualification: element.education_level.name,
                grade: element.grade,
                admission_date: new Date(element.start_date).toISOString().substr(0, 10),
                graduation_date: new Date(element.end_date).toISOString().substr(0, 10),
            })
        });

        return res.status(200).json({
            success: true,
            message: 'Qualifications were retrieved successfully',
            data: data
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again'
        });
    }
}