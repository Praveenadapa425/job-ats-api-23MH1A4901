// File: src/models/Job.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Job = sequelize.define('Job', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('open', 'closed'),
    allowNull: false,
    defaultValue: 'open',
  },
  // The `companyId` foreign key will be added automatically by the association
}, {
  timestamps: true,
});

module.exports = Job;