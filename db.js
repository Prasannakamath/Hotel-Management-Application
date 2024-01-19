const Pool = require("pg").Pool;
const dbConfig = require("./config.json").db;
const pool = new Pool(dbConfig);
module.exports = pool;
