const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info', // Log level
  format: format.combine(
    format.timestamp(),
    format.json() // Log in JSON format for structured logs
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Error logs
    new transports.File({ filename: 'logs/combined.log' }), // All logs
    new transports.Console({ format: format.simple() }) // Console logs
  ]
});

module.exports = logger;
