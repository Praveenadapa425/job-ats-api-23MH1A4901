// File: src/models/ApplicationHistory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ApplicationHistory = sequelize.define('ApplicationHistory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // We store the stages as strings for a clear, human-readable log
  previousStage: {
    type: DataTypes.STRING,
    allowNull: true, // The first entry ('Applied') has no previous stage
  },
  newStage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // `applicationId` and `changedById` foreign keys will be added automatically
}, {
  timestamps: true, // The `createdAt` field serves as our timestamp for the change
  updatedAt: false, // We don't need to track updates to this log
});

module.exports = ApplicationHistory;