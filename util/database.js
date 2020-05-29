const Sequelize = require('sequelize');

const sequelize = new Sequelize('user-database','root','123456@',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize;