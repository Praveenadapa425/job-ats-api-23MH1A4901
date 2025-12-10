// File: src/server.js

const app = require('./app');
const { sequelize } = require('./models'); // Notice we import from the models/index.js file now
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // sequelize.sync() connects to the DB and creates/updates tables based on your models.
    // { alter: true } is a non-destructive way to update tables in development.
    // It tries to make the necessary changes to the table to match the model.
    await sequelize.sync({ alter: true });
    console.log('Database & tables have been successfully synced.');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
};

startServer();