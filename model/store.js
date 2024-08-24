const Sequelize=require('sequelize')
const sequelize=require('../util/database')

const Store=sequelize.define('store',{
    itemName:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
        type:Sequelize.STRING,
        allowNull:false
    },
    quantity:{
        type:Sequelize.STRING,
        allowNull:false 
    }
})


module.exports=Store