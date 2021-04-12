const db = require('../config/db.js');
const Sequelize = require('sequelize');

const UserRole = db.define('users_roles',{
    user_id:{
        type:Sequelize.BIGINT
    },
    role_id:{
        type:Sequelize.BIGINT
    }
});

module.exports = UserRole;