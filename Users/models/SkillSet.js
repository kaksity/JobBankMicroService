const db = require('../config/db');
const Seqeulize = require('sequelize');

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

module.exports = SkillSet;