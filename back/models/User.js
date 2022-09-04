const Sequelize = require('sequelize')
const database = require('../persistence/database')

const userModel = database.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: Sequelize.STRING,
    role: {
      type: Sequelize.STRING(20),
      defaultValue: 'user',
    },
    name: {
      type: Sequelize.STRING(100),
    },
    firstName: {
      type: Sequelize.STRING(100),
    },
    departement: {
      type: Sequelize.STRING(100),
    },
  },
  {
    charset: 'utf8mb4',
    dialectOptions: {
      collate: 'utf8mb4_unicode_ci'
    }
    ,
  }
)

module.exports = userModel
