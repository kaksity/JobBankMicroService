const Education = require('../models/Education');
const Qualification = require('../models/Qualification');
const db = require('../config/db');

module.exports = async(req, res) => {

    let CourseName = req.body.course_name;
    let SchoolName = req.body.school_name;
    let EducationLevel = req.body.education_level;
    let Completed = req.body.completed;
    let Grade = req.body.grade;
    let AdmissionDate = req.body.admission_date;
    let GraduationDate = req.body.graduation_date;
    let AdditionalInfo = req.body.additional_info;

    let File = req.file;
    let ProfileId = req.user.ProfileId;
    let transaction = await db.transaction();

    try {

        let EducationResult = await Education.create({
            additional_info: AdditionalInfo,
            completed: Completed,
            course_name: CourseName,
            end_date: GraduationDate,
            grade: Grade,
            school_name: SchoolName,
            start_date: AdmissionDate,
            education_level_id: EducationLevel,
            user_profile_id: ProfileId
        })
        await Qualification.create({
            file_name: File.path,
            file_url: `http://${process.env.HOSTNAME}:${process.env.PORT}/` + File.path,
            education_id: EducationResult.id
        });

        await transaction.commit();

        return res.status(200).json({
            success: true,
            message: 'Qualifications was uploaded successfully'
        });
    } catch (e) {
        await transaction.rollback();
        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again'
        })
    }
}