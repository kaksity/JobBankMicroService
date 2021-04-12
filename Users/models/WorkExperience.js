const db = require('../config/db');
const Sequelize = require('sequelize');
const WorkExperience = db.define('work_experience',{
    additional_info:{
       type:Sequelize.STRING
    },
    current_work:{
      type:Sequelize.STRING  
    },
    description:{
        type:Sequelize.STRING
    },
    end_date:{
        type:Sequelize.TIME
    },
    job_title:{
        type:Sequelize.STRING
    },
    organisation:{
        type:Sequelize.STRING
    },
    start_date:{
        type:Sequelize.TIME
    },
    user_profile_id:{
        type:Sequelize.BIGINT
    }
});

module.exports = WorkExperience