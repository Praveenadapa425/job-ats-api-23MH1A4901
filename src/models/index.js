// File: src/models/index.js

const sequelize = require('../config/database');
const User = require('./User');
const Company = require('./Company');
const Job = require('./Job');
const Application = require('./Application');
const ApplicationHistory = require('./ApplicationHistory');

// --- Define Relationships (Associations) ---

// A Company has many Users (Recruiters/Managers), but a User (Candidate) doesn't need a Company.
Company.hasMany(User, { foreignKey: 'companyId', constraints: false });
User.belongsTo(Company, { foreignKey: 'companyId' });

// A Company has many Jobs. A Job must belong to a Company.
Company.hasMany(Job, { foreignKey: { name: 'companyId', allowNull: false } });
Job.belongsTo(Company, { foreignKey: { name: 'companyId', allowNull: false } });

// A Job has many Applications. An Application must belong to a Job.
Job.hasMany(Application, { foreignKey: { name: 'jobId', allowNull: false } });
Application.belongsTo(Job, { foreignKey: { name: 'jobId', allowNull: false } });

// A User (as a Candidate) has many Applications. An Application must belong to a Candidate.
User.hasMany(Application, { foreignKey: { name: 'candidateId', allowNull: false } });
Application.belongsTo(User, { as: 'candidate', foreignKey: { name: 'candidateId', allowNull: false } });

// An Application has many History logs. A History log must belong to an Application.
Application.hasMany(ApplicationHistory, { foreignKey: { name: 'applicationId', allowNull: false } });
ApplicationHistory.belongsTo(Application, { foreignKey: { name: 'applicationId', allowNull: false } });

// A User (as a Recruiter) can be the source of many History changes. A History log must record who changed it.
User.hasMany(ApplicationHistory, { foreignKey: { name: 'changedById', allowNull: false } });
ApplicationHistory.belongsTo(User, { as: 'changedBy', foreignKey: { name: 'changedById', allowNull: false } });

// Export all models and the sequelize instance for use elsewhere in the application
module.exports = {
  sequelize,
  User,
  Company,
  Job,
  Application,
  ApplicationHistory,
};