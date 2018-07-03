const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation');
require('./startup/prod')(app);

const port = process.env.PORT || 3000;

app.listen(port, () => winston.info(`app running on port number ${port}`));