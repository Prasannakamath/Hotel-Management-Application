const pool = require("../db");
const queries = require("../queries/menuQueries");

//Get ALl Items
function getAllItems() {
  return new Promise((resolve, reject) => {
    pool.query(queries.getAllItems, (error, result) => {
      if (error) reject(error);
      console.log(result.rows);
      resolve(result.rows);
    });
  });
}

//Add new Item
function addItem(content) {
  return new Promise((resolve, reject) => {
    pool.query(queries.checkIfItemExists, [content.name], (error, result) => {
      if (error) reject(error, "E");
      if (result.rowCount > 0) {
        reject(
          new Error(
            `Item named ${content.name} already exists in the menu. Please use 'PUT' method to update.`
          )
        );
      } else {
        pool.query(
          queries.addItem,
          [
            content.name,
            content.price,
            content.item_calories,
            content.instock,
            content.rawmaterial,
          ],
          (error, result) => {
            if (error) reject(error);
            resolve();
          }
        );
      }
    });
  });
}

function updateItem(content) {
  return new Promise((resolve, reject) => {
    console.log(content);
    pool.query(
      queries.checkIfItemExists,
      [content.item_name],
      (error, result) => {
        if (error) reject(error);
        if (result.rowCount > 0) {
          pool.query(
            queries.updateItem,
            [
              content.item_name,
              content.item_price,
              content.item_calories,
              content.instock,
              content.rawmaterial,
            ],
            (error, result) => {
              if (error)
                reject(
                  new Error(
                    `Error occured while updating item: ${content.item_name}.\nError: ${error}`
                  )
                );
              pool.query(
                queries.getItemById,
                [content.item_id],
                (error, result) => {
                  if (error) reject(error);
                  resolve(result.rows);
                }
              );
            }
          );
        } else {
          reject(
            new Error(`No item found to update with name: ${content.name}`)
          );
        }
      }
    );
  });
}

function deleteItemByName(itemName) {
  return new Promise((resolve, reject) => {
    pool.query(queries.getItemByName, [itemName], (error, result) => {
      if (error) reject(error);
      if (result.rowCount > 0) {
        let item = result.rows[0];
        console.log(`deleting item: ${itemName}`);
        pool.query(queries.deleteItemByName, [itemName], (error, result) => {
          if (error) reject(error);
          resolve(item);
        });
      } else {
        reject(new Error(`Item with name ${itemName} not found in database`));
      }
    });
  });
}

function getItemById(id) {
  return new Promise((resolve, reject) => {
    pool.query(queries.getItemById, [id], (error, result) => {
      if (error) reject(error);
      if (result.rowCount > 0) {
        resolve(result.rows[0]);
      } else {
        reject(new Error("No Item Found"));
      }
    });
  });
}
module.exports = {
  getAllItems,
  addItem,
  updateItem,
  deleteItemByName,
  getItemById,
};
