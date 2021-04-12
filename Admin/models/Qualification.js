const db = require('../config/db')
const Sequelize = require('sequelize');
const Education = require('./Education')
const Qualification = db.define('qualification',{
    file_name:{
        type:Sequelize.STRING
    },
    file_url:{
        type:Sequelize.STRING
    },
    education_id:{
        type:Sequelize.BIGINT
    }
});

module.exports = Qualification