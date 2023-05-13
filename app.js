/* eslint-disable no-console */

const express = require('express');

const app = express();
const tasks = require('./routes/task_routes');
const auth = require('./routes/auth_routes');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/notfound');

app.use(express.json());
app.use('/api/v1/tasks', tasks);
app.use('/api/v1/task_manager', auth);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
