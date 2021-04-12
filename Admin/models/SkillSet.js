const db = require('../config/db');
const Seqeulize = require('sequelize');
const Profile = require('./Profile');

const SkillSet = db.define('skill_set',{
    skill_id:{
        type:Seqeulize.BIGINT
    },
    skill_name:{
        type:Seqeulize.STRING
    },
    user_profile_id:{
        type:Seqeulize.BIGINT
    }
});

SkillSet.belongsTo(Profile,{
    foreignKey:'user_profile_id',
})

Profile.hasMany(SkillSet,{
    foreignKey:'user_profile_id'
})
module.exports = SkillSet;