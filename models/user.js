const Sequelize = require('sequelize');

const sequelize = require("../util/database")

const User = sequelize.define('user_info',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    dob:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    number:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    }

});

module.exports = User