const Profile = require('../models/Profile');
const EducationLevel = require('../models/EducationLevel');
const LGA = require('../models/LGA')
const Excel = require('excel4node');
const path = require('path');
module.exports = async(req,res)=>{
    try {
        let EducatedStatus = req.query.educated;
        let EmploymentStatus = req.query.employment;
        let MaritalStatus = req.query.marital;
        let Qualification = req.query.qualification;
        let Gender = req.query.gender;
        let LGAID = req.query.lga;

        //Since We have the Query Parameter as objects
        //Formulate the Query and then Send the Response

        let QueryOptions = {
            profile_completed:true,
        };

        if(EducatedStatus != undefined){
            QueryOptions.educated = EducatedStatus;
        }
        if(EmploymentStatus != undefined){
            QueryOptions.employment_status = EmploymentStatus;
        }

        if(MaritalStatus != undefined){
            QueryOptions.marital_status = MaritalStatus;
        }
        if(Qualification != undefined){
            const result = await EducationLevel.findOne({
              where:{
                id:Qualification
              }
            });

            QueryOptions.highest_education_level = result.name;
        }
        if(Gender != undefined){
            QueryOptions.gender = Gender;
        }
        if(LGAID != undefined){
            QueryOptions.lga_id = LGAID;
        }

        const result = await Profile.findAll({
            attributes:['firstname','middlename','lastname','phone','gender','educated','highest_education_level','marital_status','lga.name'],
            where:QueryOptions,
            include:[
                {
                    model:LGA,
                    attributes:['name'],
                }
            ],
        })

        let data = [];

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
        for(let i = 2; i < 11; i++){
            WorkSheet.column(i).setWidth(30);
        }

        WorkSheet.cell(1,1).string("S/No").style(HeaderStyle);
        WorkSheet.cell(1,2).string("First Name").style(HeaderStyle);
        WorkSheet.cell(1,3).string("Middle Name").style(HeaderStyle);
        WorkSheet.cell(1,4).string("Last Name").style(HeaderStyle);
        WorkSheet.cell(1,5).string("Gender").style(HeaderStyle);
        WorkSheet.cell(1,6).string("Educated").style(HeaderStyle);
        WorkSheet.cell(1,7).string("Phone Number").style(HeaderStyle);
        WorkSheet.cell(1,8).string("Highest Qualification").style(HeaderStyle);
        WorkSheet.cell(1,9).string("Marital Status").style(HeaderStyle);
        WorkSheet.cell(1,10).string("Local Government Area").style(HeaderStyle);

        let Count =1;
        let Row = 2

        result.forEach(element => {

            WorkSheet.cell(Row,1).number(Count).style(BodyStyle);
            WorkSheet.cell(Row,2).string(element.firstname).style(BodyStyle);
            WorkSheet.cell(Row,3).string(element.middlename).style(BodyStyle);
            WorkSheet.cell(Row,4).string(element.lastname).style(BodyStyle);
            WorkSheet.cell(Row,5).string(element.gender).style(BodyStyle);
            WorkSheet.cell(Row,6).string((element.educated == true) ? 'Yes' : 'No').style(BodyStyle);
            WorkSheet.cell(Row,7).string(element.phone).style(BodyStyle);
            WorkSheet.cell(Row,8).string(element.highest_education_level).style(BodyStyle);
            WorkSheet.cell(Row,9).string(element.marital_status).style(BodyStyle);
            WorkSheet.cell(Row,10).string(element.lga.name).style(BodyStyle);

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

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success:false,
            message:'Something went wrong. Try again'
        });
    }
}
