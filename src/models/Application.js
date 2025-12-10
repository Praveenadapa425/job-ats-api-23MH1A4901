// File: src/models/Application.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // This field is the heart of our state machine
  stage: {
    type: DataTypes.ENUM(
      'Applied',
      'Screening',
      'Interview',
      'Offer',
      'Hired',
      'Rejected'
    ),
    allowNull: false,
    defaultValue: 'Applied',
  },
  // `jobId` and `candidateId` foreign keys will be added automatically
}, {
  timestamps: true,
});

module.exports = Application;