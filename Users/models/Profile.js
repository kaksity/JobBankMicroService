const db = require('../config/db');
const Sequelize = require('sequelize');
const LGA = require('./LGA');
const Education = require('./Education');
const WorkExperience = require('./WorkExperience');
const SkillSet = require('./SkillSet');
const Profile = db.define('profile',{
    additional_info:{
        type:Sequelize.STRING
    },
    avatar_file_name:{
        type:Sequelize.STRING
    },
    avatar_url:{
        type:Sequelize.STRING
    },
    contact_address:{
        type:Sequelize.STRING
    },
    dob:{
        type:Sequelize.DATE
    },
    educated:{
        type:Sequelize.BOOLEAN
    },
    employment_status:{
        type:Sequelize.STRING
    },
    firstname:{
        type:Sequelize.STRING
    },
    gender:{
        type:Sequelize.STRING
    },
    highest_education_level:{
        type:Sequelize.STRING
    },
    lastname:{
        type:Sequelize.STRING
    },
    marital_status:{
        type:Sequelize.STRING
    },
    middlename:{
        type:Sequelize.STRING
    },
    phone:{
        type:Sequelize.STRING
    },
    profile_completed:{
        type:Sequelize.BOOLEAN
    },
    lga_id:{
        type:Sequelize.BIGINT
    },
    user_id:{
        type:Sequelize.BIGINT
    },
    registration_time:{
        type:Sequelize.DATE
    }
});

Profile.belongsTo(LGA,{
    foreignKey:'lga_id'
});

Profile.hasMany(Education,{
    foreignKey:'user_profile_id'
});

Profile.hasMany(WorkExperience,{
    foreignKey:'user_profile_id'
});

Profile.hasMany(SkillSet,{
    foreignKey:'user_profile_id'
});
module.exports = Profile