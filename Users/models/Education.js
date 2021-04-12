const db = require('../config/db');
const Sequelize = require('sequelize');
const EducationLevel = require('./EducationLevel');
const Qualification = require('./Qualification');
const Education = db.define('education',{
    additional_info:{
        type:Sequelize.STRING
    },
    completed:{
        type:Sequelize.STRING
    },
    course_name:{
        type:Sequelize.STRING
    },
    end_date:{
        type:Sequelize.DATE
    },
    grade:{
        type:Sequelize.STRING
    },
    school_name:{
        type:Sequelize.STRING
    },
    start_date:{
        type:Sequelize.DATE
    },
    education_level_id:{
        type:Sequelize.BIGINT
    },
    user_profile_id:{
        type:Sequelize.BIGINT
    }
});

Education.belongsTo(EducationLevel,{
    foreignKey:'education_level_id'
})

Education.hasOne(Qualification,{
    foreignKey:'education_id'
})
module.exports = Education;