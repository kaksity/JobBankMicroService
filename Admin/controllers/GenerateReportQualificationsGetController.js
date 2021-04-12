const Sequelize = require('sequelize');
const Education = require('../models/Education');
const Profile = require('../models/Profile');
const Excel = require('excel4node');
const EducationLevel = require('../models/EducationLevel');

module.exports = async(req,res)=>{

    try{

        let Completed = req.query.completed;
        let Qualification = req.query.qualification;
        let Grade = req.query.grade;
        let CourseName = req.query.course;

        let QueryOptions = {};

        if(Completed != undefined){
            QueryOptions.completed = Completed;
        }
        if(Qualification != undefined){
            QueryOptions.education_level_id = Qualification;
        }
        if(Grade != undefined){
            QueryOptions.grade = Grade;
        }

        if(CourseName != undefined){
            QueryOptions.course_name = {
                [Sequelize.Op.iLike]:`%${CourseName}`,
            };
        }
        let result = await Education.findAll({
            where:QueryOptions,
            include:[{
                model:Profile,
                attributes:['firstname','middlename','lastname','gender','phone']
            },{
                model:EducationLevel,
                attributes:['name'],
            }]
        });

        const Workbook = new Excel.Workbook({
            defaultFont:{
                size:13,
                name:'Calibri'
            },
            workbookView:{
                showHorizontalScroll:true,
                showVerticalScrool:true,
            },
            logLevel:0,
        });
        const WorkSheet = Workbook.addWorksheet('sheet 1');
        
        const HeaderStyle = Workbook.createStyle({
            alignment:{
                horizontal:'center'
            },
            font:{
                bold:true,
                color:'#000000'
            },
            border:{
                left:{
                    style:'thin',
                    color:'#000000',
                },
                right:{
                    style:'thin',
                    color:'#000000',
                },
                top:{
                    style:'thin',
                    color:'#000000',
                },
                bottom:{
                    style:'thin',
                    color:'#000000',
                },
            },
            fill:{
                type:'gradient',
                bgColor:'#000000',
            }
        });

        const BodyStyle = Workbook.createStyle({
            alignment:{
                horizontal:['center']
            },
            border:{
                left:{
                    style:'thin',
                    color:'#000000',
                },
                right:{
                    style:'thin',
                    color:'#000000',
                },
                top:{
                    style:'thin',
                    color:'#000000',
                },
                bottom:{
                    style:'thin',
                    color:'#000000',
                },
            },
        });
        for(let i = 2; i < 14; i++){
            WorkSheet.column(i).setWidth(30);
        }
        
        WorkSheet.cell(1,1).string("S/No").style(HeaderStyle);
        WorkSheet.cell(1,2).string("First Name").style(HeaderStyle);
        WorkSheet.cell(1,3).string("Middle Name").style(HeaderStyle);
        WorkSheet.cell(1,4).string("Last Name").style(HeaderStyle);
        WorkSheet.cell(1,5).string("Gender").style(HeaderStyle);
        WorkSheet.cell(1,6).string("Phone Number").style(HeaderStyle);
        WorkSheet.cell(1,7).string("Completed").style(HeaderStyle);
        WorkSheet.cell(1,8).string("Qualification").style(HeaderStyle);
        WorkSheet.cell(1,9).string("Course Name").style(HeaderStyle);
        WorkSheet.cell(1,10).string("Grade").style(HeaderStyle);
        WorkSheet.cell(1,11).string("School Name").style(HeaderStyle);
        WorkSheet.cell(1,12).string("Year Of Admission").style(HeaderStyle);
        WorkSheet.cell(1,13).string("Year of Graduation").style(HeaderStyle);
        
        
        let Count =1;
        let Row = 2
    
        result.forEach(element => {
            
            WorkSheet.cell(Row,1).number(Count).style(BodyStyle);
            WorkSheet.cell(Row,2).string(element.profile.firstname).style(BodyStyle);
            WorkSheet.cell(Row,3).string(element.profile.middlename).style(BodyStyle);
            WorkSheet.cell(Row,4).string(element.profile.lastname).style(BodyStyle);
            WorkSheet.cell(Row,5).string(element.profile.gender).style(BodyStyle);
            WorkSheet.cell(Row,6).string(element.profile.phone).style(BodyStyle);
            WorkSheet.cell(Row,7).string(element.completed).style(BodyStyle);
            WorkSheet.cell(Row,8).string(element.education_level.name).style(BodyStyle);
            WorkSheet.cell(Row,9).string(element.course_name).style(BodyStyle);
            WorkSheet.cell(Row,10).string(element.grade).style(BodyStyle);
            WorkSheet.cell(Row,11).string(element.school_name).style(BodyStyle);
            WorkSheet.cell(Row,12).date(element.start_date).style(BodyStyle);
            WorkSheet.cell(Row,13).date(element.end_date).style(BodyStyle);
            Count += 1;
            Row += 1;
        });
    
        let FileName = Date.now();
        Workbook.write(`public/${FileName}.xlsx`);

    return res.status(200).json({
            success:true,
            message:'Report was created Successfully',
            url:`http://${process.env.HOSTNAME}:${process.env.PORT}/public/${FileName}.xlsx`,
        });
    }catch(e){
        return res.status(500).json({
            success:false,
            message:'Something went wrong. Try again',
        });
    }
}  