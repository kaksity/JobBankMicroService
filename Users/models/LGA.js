const db = require('../config/db.js');
const Seqeuelize = require('sequelize');

const LGA = db.define('lga',{
    name:{
        type:Seqeuelize.STRING
    }
})

module.exports = LGA;