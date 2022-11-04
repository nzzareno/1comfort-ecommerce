const winston = require("winston");

const logger = winston.createLogger({
  level: "debug",
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: "./logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "./logs/warn.log",
      level: "warn",
    })
  ],
});

// logger.silly("silly message");
// logger.debug("debug message");
// logger.info("info message");
// logger.warn("warn message");
// logger.error("error message");

module.exports = logger;
