// File: src/models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  // Primary Key
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // User's email, must be unique and is used for login
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      msg: 'This email address is already in use.',
    },
    validate: {
      isEmail: {
        msg: 'Please enter a valid email address.',
      },
    },
  },
  // Securely stored password
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Role-Based Access Control (RBAC) field
  role: {
    type: DataTypes.ENUM('candidate', 'recruiter', 'hiring_manager'),
    allowNull: false,
    validate: {
      isIn: {
        args: [['candidate', 'recruiter', 'hiring_manager']],
        msg: 'Role must be one of: candidate, recruiter, or hiring_manager.',
      },
    },
  },
  // The `companyId` foreign key will be added automatically by the association in index.js
}, {
  // Sequelize hooks are automatic actions triggered by events
  hooks: {
    // This hook runs automatically just before a new user is created
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    // (Optional) This hook can be used for updating passwords
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = User;