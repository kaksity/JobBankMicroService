const db = require('../config/db');
const Sequelize = require('sequelize');

const PasswordResetToken = db.define('password_reset_token',{
    expiry_date:{
        type:Sequelize.TIME
    },
    token:{
        type:Sequelize.STRING
    },
    user_id:{
        type:Sequelize.BIGINT
    }
});

module.exports = PasswordResetToken