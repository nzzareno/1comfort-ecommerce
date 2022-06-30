const knexConfig = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "one_comfort",
  },
  pool: {
    min: 0,
    max: 10,
  },
};

module.exports = { knexConfig };
