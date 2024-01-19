const pool = require("../db");
const queries = require("../queries/custTableQueries");

function getAllTables() {
  return new Promise((resolve, reject) => {
    pool.query(queries.getAllTables, (error, result) => {
      if (error) reject(error);
      console.log(result.rows);
      if (result.rowCount > 0) {
        resolve(result.rows);
      } else {
        console.log("No Tables Available");
        reject(new Error("No Tables Available"));
      }
    });
  });
}

function addTable(table) {
  return new Promise((resolve, reject) => {
    if (!table) reject(new Error("No data found to Add"));
    pool.query(queries.getTableById, [table.table_id], (error, result) => {
      if (error) reject(error);
      if (result.rowCount > 0) {
        reject(new Error("Table Already Exists."));
      } else {
        pool.query(
          queries.addNewTable,
          [
            table.table_id,
            table.waiter_id || null,
            table.isreserved || null,
            table.isoccupied || null,
          ],
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        );
      }
    });
  });
}

function updateTable(table) {
  return new Promise((resolve, reject) => {
    pool.query(queries.getTableById, [table.table_id], (error, result) => {
      if (error) reject(error);
      if (result.rowCount > 0) {
        pool.query(
          queries.updateTableById,
          [table.table_id, table.waiter_id, table.isreserved, table.isoccupied],
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        );
      } else {
        reject(new Error("customer table not found"));
      }
    });
  });
}

function deleteTable(id) {
  return new Promise((resolve, reject) => {
    pool.query(queries.getTableById, [id], (error, result) => {
      if (error) reject(error);
      if (result.rowCount > 0) {
        let table = result.rows[0];
        pool.query(
          queries.deleteTableById,
          [table.table_id],
          (error, result) => {
            if (error) reject(error);
            table.message = "This table is deleted from database";
            resolve(table);
          }
        );
      }
    });
  });
}

function getTableById(id) {
  return new Promise((resolve, reject) => {
    pool.query(queries.getTableById, [id], (error, result) => {
      if (error) reject(error);
      resolve(result.rows);
    });
  });
}

module.exports = {
  getAllTables,
  getTableById,
  updateTable,
  deleteTable,
  addTable,
};
