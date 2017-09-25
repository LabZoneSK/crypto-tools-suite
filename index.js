/* Load .env variables to process.env */
require('dotenv').config();

const notifier = require('./logic/notifier');
notifier.run();
