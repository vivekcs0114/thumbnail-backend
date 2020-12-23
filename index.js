const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the Express App
const app = new express();
app.use(cors());

// Import required modules
const rootRoute = require('./server/routes');
const serverConfig = require('./server/config');

// Apply body Parser and server public assets and routes
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use('/', rootRoute);

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Application is running on port: ${serverConfig.port}!`);
  }
});
