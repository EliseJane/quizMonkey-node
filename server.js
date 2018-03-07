const dataBaseService = require('./helpers/db');
const logger = require('./log');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const winston = require('winston');
const port = process.env.PORT || 3001;

const mainLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  mainLogger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

logger.log = mainLogger;

const httpLog = morgan(
  'combined',
  {
    "stream": {
      write: (str) => { mainLogger.info(str);
    }
  }
});

app.use(httpLog);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./controllers'));

dataBaseService.connect()
.then(() => {
  app.listen(port, () => {
    mainLogger.info('Listening on port ' + port);
  })
})
.catch((err => {
  mainLogger.error(err);
  process.exit(1);
}));
