const db = require('../config/db');
const Sequelize = require('sequelize');
const UserRole = require('./UserRole');

const UserInfo = db.define('user_info',{
    enabled:{
        type:Sequelize.BOOLEAN
    },
    firstname:{
        type:Sequelize.STRING
    },
    is_using2fa:{
        type:Sequelize.BOOLEAN
    },
    lastname:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    },
    secret:{
        type:Sequelize.STRING
    },
    phone:{
        type:Sequelize.STRING
    },
    email_address:{
        type:Sequelize.STRING
    },
    profile_id:{
        type:Sequelize.BIGINT
    }
});

UserInfo.hasMany(UserRole,{
    foreignKey:'user_id'
});

module.exports = UserInfo;