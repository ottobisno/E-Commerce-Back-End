const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

// Defining our express instance and port
const app = express();
const PORT = process.env.PORT || 3001;

// Enable the use of json and url-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Turn on routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false}).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
});