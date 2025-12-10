// File: src/models/Company.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'A company with this name already exists.',
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true, // Description can be optional
  },
}, {
  timestamps: true,
});

module.exports = Company;