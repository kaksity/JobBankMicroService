const db = require('../config/db');
const Seqeulize = require('sequelize');

const Skill = db.define('skills',{
    skill:{
        type:Seqeulize.STRING
    }
});

module.exports = Skill