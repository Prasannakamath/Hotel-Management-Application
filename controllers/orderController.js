const pool = require("../db");
const orderQueries = require("../queries/orderQueries");
const menuController = require("./menuController");

//Add Order
function addOrder(order) {
  return new Promise((resolve, reject) => {
    if (order.order_id) {
      pool
        .query(orderQueries.checkIfOrderIdExists, [order.order_id])
        .then((result) => {
          if (result.rowCount > 0) {
            pool.query(
              orderQueries.addOrder,
              [
                order.order_id,
                order.table_id,
                order.item_id,
                order.quantity,
                order.parcel,
              ],
              (error, result) => {
                if (error) reject(error);
                resolve(result);
              }
            );
          } else {
            reject(
              new Error(
                "Order does not exist. Create new Order without orderid"
              )
            );
          }
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      pool
        .query(orderQueries.getMaxOrderId)
        .then((result) => {
          console.log(result);
          if (result.rowCount > 0) {
            let order_id = parseInt(result.rows[0].max) + 1;
            console.log(order_id);
            pool.query(
              orderQueries.addOrder,
              [
                order_id,
                order.table_id,
                order.item_id,
                order.quantity,
                order.parcel,
              ],
              (error, result) => {
                if (error) reject(error);
                resolve(result);
              }
            );
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}
//delete order
function deleteItemByOrderId(item_id, order_id) {
  return new Promise((resolve, reject) => {
    pool.query(orderQueries.getOrderById, [order_id], (error, result) => {
      if (error) reject(error);
      let itemsInOrder = result.rows;
      if (itemsInOrder.length > 0) {
        let targetItem = itemsInOrder.filter(
          (item) => parseInt(item.item_id) === item_id
        );
        if (targetItem.length > 0) {
          pool.query(
            orderQueries.deleteItemByOrderById,
            [order_id, item_id],
            (error, result) => {
              if (error) reject(error);
              resolve(targetItem);
            }
          );
        } else {
          reject(
            new Error(`No Items found in Order(${order_id}) with id ${item_id}`)
          );
        }
      } else {
        reject(new Error(`No Order found with id ${order_id}`));
      }
    });
  });
}

function modifyOrder(order) {
  return new Promise((resolve, reject) => {
    if (order.iscomplete)
      reject(
        new Error(
          "Please use other endpoint to mark order as complete or remove iscomplete attribute to proceed."
        )
      );
    pool.query(orderQueries.getOrderById, [order.order_id], (error, result) => {
      if (error) reject(error);
      if (result.rowCount > 0) {
        let targetItem = result.rows.filter(
          (item) => parseInt(item.item_id) === order.item_id
        );
        if (targetItem.length > 0) {
          if (targetItem[0].iscomplete === true)
            reject(new Error("Cannot update completed order"));
          pool.query(
            orderQueries.modifyOrderById,
            [order.order_id, order.item_id, order.quantity, order.parcel],
            (error, result) => {
              if (error) reject(error);
              resolve(order);
            }
          );
        } else {
          reject(new Error(`Item ${order.item_id} not found for given order`));
        }
      } else {
        reject(new Error(`Order ${order.order_id} not found`));
      }
    });
  });
}

function getOrderById(order_id) {
  return new Promise((resolve, reject) => {
    pool.query(orderQueries.getOrderById, [order_id], (error, result) => {
      if (error) reject(error);
      if (result.rowCount > 0) {
        resolve(result.rows);
      } else {
        reject(new Error(`No order found with id: ${order_id}`));
      }
    });
  });
}

function getAllOrders() {
  return new Promise((resolve, reject) => {
    pool.query(orderQueries.getAllOrders, (error, result) => {
      if (error) reject(error);
      resolve(result.rows);
    });
  });
}

function markOrderAsComplete(order_id) {
  return new Promise((resolve, reject) => {
    pool
      .query(orderQueries.getOrderById, [order_id])
      .then((result) => {
        if (result.rowCount > 0) {
          let order = result.rows;
          if (result.rows[0].iscomplete)
            reject(
              new Error("Order already marked complete. Please check order id")
            );
          pool
            .query(orderQueries.updateOrderAsComplete, [order_id])
            .then((result) => {
              console.log(result);
              order.map((orderObj) => {
                delete orderObj.iscomplete;
              });
              resolve(order);
            })
            .catch((error) => {
              reject(error);
            });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  addOrder,
  deleteItemByOrderId,
  modifyOrder,
  getOrderById,
  getAllOrders,
  markOrderAsComplete,
};
