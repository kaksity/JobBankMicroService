const Sequelize = require('sequelize');
const SkillSet = require('../models/SkillSet');
const Profile = require('../models/Profile');
const Excel = require('excel4node');
const Path = require('path');
module.exports = async(req,res)=>{

    let SkillID = req.query.id;
    let SkillName = req.query.name;

    let result;

    if(SkillID == undefined && SkillName == undefined){
        result = await SkillSet.findAll({
            include:[{
                model:Profile
            }]
        });
    }else if(SkillID != undefined && SkillName == undefined) {
        result = await SkillSet.findAll({
            where:{
                skill_id:SkillID
            },
            include:[{
                model:Profile
            }]
        });
    } else if(SkillID != undefined && SkillName != undefined){
    
        result = await SkillSet.findAll({
            where:{
                skill_id:SkillID,
                skill_name:{
                    [Sequelize.Op.iLike]:`%Others (${SkillName} )`
                }
            },
            include:[{
                model:Profile
            }]
        });
    }

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
    for(let i = 2; i < 8; i++){
        WorkSheet.column(i).setWidth(30);
    }
    
    WorkSheet.cell(1,1).string("S/No").style(HeaderStyle);
    WorkSheet.cell(1,2).string("First Name").style(HeaderStyle);
    WorkSheet.cell(1,3).string("Middle Name").style(HeaderStyle);
    WorkSheet.cell(1,4).string("Last Name").style(HeaderStyle);
    WorkSheet.cell(1,5).string("Gender").style(HeaderStyle);
    WorkSheet.cell(1,6).string("Phone Number").style(HeaderStyle);
    WorkSheet.cell(1,7).string("Skills").style(HeaderStyle);
    
    let Count =1;
    let Row = 2
   
    result.forEach(element => {
        
        WorkSheet.cell(Row,1).number(Count).style(BodyStyle);
        WorkSheet.cell(Row,2).string(element.profile.firstname).style(BodyStyle);
        WorkSheet.cell(Row,3).string(element.profile.middlename).style(BodyStyle);
        WorkSheet.cell(Row,4).string(element.profile.lastname).style(BodyStyle);
        WorkSheet.cell(Row,5).string(element.profile.gender).style(BodyStyle);
        WorkSheet.cell(Row,6).string(element.profile.phone).style(BodyStyle);
        WorkSheet.cell(Row,7).string(element.skill_name).style(BodyStyle);
        
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

}  