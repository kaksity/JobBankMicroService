const PDFDocumentKit = require('pdfkit');
const fs = require('fs');
const Profile = require('../models/Profile');
const LGA = require('../models/LGA');
const Education = require('../models/Education');
const EducationLevel = require('../models/EducationLevel');
const WorkExperience = require('../models/WorkExperience');
const SkillSet = require('../models/SkillSet');

module.exports = async(req,res) => {

    const ProfileID = req.params.id;
    const doc = new PDFDocumentKit;
    const FileName = Date.now();
    doc.pipe(fs.createWriteStream(`public/${FileName}.pdf`));
    doc.fontSize(10);
    let ProfileId = req.params.id;
    try{
        let result = await Profile.findOne({
            where:{
                id:ProfileId
            },
            include:[{
                model:LGA
            },{
                model:Education,
                include:EducationLevel
            },{
                model:WorkExperience
            },{
                model:SkillSet
            }]
        })

        let ProfileData = {
            first_name:result.firstname,
            middle_name:result.middlename == null ?'':result.middlename,
            last_name:result.lastname,
            phone_number:result.phone == null ?'':result.phone,
            dob:result.dob == null ?'':new Date(result.dob).toISOString().substr(0, 10),
            gender: result.gender == null ?'':result.gender,
            highest_education_level:result.highest_education_level == null ?'':result.highest_education_level,
            marital_status:result.marital_status == null?'':result.marital_status,
            employment_status:result.employment_status == null?'':result.employment_status,
            lga:result.lga_id == null ? '':result.lga.name,
            contact_address: result.contact_address == null ?'':result.contact_address,
            additional_info:result.additional_info == null?'':result.additional_info,
            photo:result.avatar_url
        }

        doc.fontSize(25).font('Helvetica-Bold').text(`${ProfileData.first_name.toUpperCase()} ${ProfileData.last_name.toUpperCase()} ${ProfileData.middle_name.toUpperCase()}`,{
            align:'center',
        }).font('Helvetica').fontSize(20).text(`${ProfileData.contact_address.toUpperCase()}`,{
            align:'center'
        }).text(`${ProfileData.phone_number.toUpperCase()}`,{
            align:'center'
        }).moveDown();

        doc.fontSize(15).font('Helvetica-Bold').text('BIO DATA').font('Helvetica').fontSize(10).moveDown(0.2);
        // doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50,400).lineTo(50,400).stroke();
        //Write the First Name
        doc.font('Helvetica-Bold').text('DATE OF BIRTH').font('Helvetica');
        doc.text(`${ProfileData.dob}`).moveDown(0.2);
        doc.font('Helvetica-Bold').text('GENDER').font('Helvetica');
        doc.text(`${ProfileData.gender.toUpperCase()}`).moveDown(0.2);
        doc.font('Helvetica-Bold').text('LOCAL GOVERNMENT AREA').font('Helvetica');
        doc.text(`${ProfileData.lga.toUpperCase()}`).moveDown(0.2);
        doc.font('Helvetica-Bold').text('MARITAL STATUS').font('Helvetica');
        doc.text(`${ProfileData.marital_status.toUpperCase()}`).moveDown(0.2);

        doc.moveDown(1)
        doc.fontSize(15).font('Helvetica-Bold').text('EDUCATIONAL QUALIFICATION DATA').fontSize(10).font('Helvetica');

        result.education.forEach(element => {
            doc.font('Helvetica-Bold').text('SCHOOL NAME').font('Helvetica');
            doc.text(`${element.school_name.toUpperCase()}`).moveDown(0.2);
            doc.font('Helvetica-Bold').text('COURSE NAME').font('Helvetica');
            doc.text(`${element.course_name.toUpperCase()}`).moveDown(0.2);
            doc.font('Helvetica-Bold').text('GRADE').font('Helvetica');
            doc.text(`${element.grade.toUpperCase()}`).moveDown(0.2);
            doc.font('Helvetica-Bold').text('GRADUATION YEAR').font('Helvetica');
            doc.text(`${new Date(element.end_date).toISOString().substr(0,10)}`);
            doc.moveDown(0.7);
        })

        doc.fontSize(15).font('Helvetica-Bold').text('WORK EXPERIENCE DATA').fontSize(10).font('Helvetica');

        result.work_experiences.forEach((element)=>{
            
            doc.font('Helvetica-Bold').text('NAME OF ORGANIZATION').font('Helvetica');
            doc.text(`${element.organisation.toUpperCase()}`).moveDown(0.2);
            doc.font('Helvetica-Bold').text('JOB TITLE').font('Helvetica');
            doc.text(`${element.job_title.toUpperCase()}`).moveDown(0.2);
            doc.font('Helvetica-Bold').text('START WORKING YEAR').font('Helvetica');
            doc.text(`${new Date(element.start_date).toISOString().substr(0,10)}`).moveDown(0.2);
            doc.font('Helvetica-Bold').text('STOP WORKING YEAR').font('Helvetica');
            doc.text(`${new Date(element.end_date).toISOString().substr(0,10)}`);
            doc.moveDown(0.7);
        });

        doc.fontSize(15).font('Helvetica-Bold').text('ADDITIONAL SKILL DATA').fontSize(10).font('Helvetica');

        result.skill_sets.forEach(element=>{
            doc.font('Helvetica-Bold').text('SKILL NAME').font('Helvetica');
            doc.text(`${element.skill_name.toUpperCase()}`).moveDown(0.2);
            doc.moveDown(0.7);
        })

        doc.end();
        return res.status(200).json({
            success:true,
            message:'CV was generated Successfully',
            url:`http://${process.env.HOSTNAME}:${process.env.PORT}/public/${FileName}.pdf`
        });
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success:false,
            message:'Something went wrong. Try again'
        })
    }

 
}