const db = require('../config/db');
const Sequelize = require('sequelize');

const EducationLevel = db.define('education_level',{
    name:{
        type:Sequelize.STRING
    }
});

module.exports = EducationLevel;