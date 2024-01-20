const addOrder =
  'insert into "hotelManagement".order(order_id,table_id,item_id,quantity,parcel) values($1,$2,$3,$4,$5)';
const getOrderById =
  'select order_id,table_id,item_id,quantity,parcel from "hotelManagement".order where order_id=$1';
const deleteItemByOrderById =
  'delete from "hotelManagement".order where order_id=$1 and item_id=$2';
const modifyOrderById =
  'update "hotelManagement".order set quantity=$3,parcel=$4 where order_id=$1 and item_id=$2';

const getAllOrders =
  'select order_id,table_id,item_id,quantity,parcel from "hotelManagement".order';

const getCountOfAllOrders = 'select count(1) from "hotelManagement".order';

module.exports = {
  addOrder,
  getOrderById,
  deleteItemByOrderById,
  modifyOrderById,
  getAllOrders,
  getCountOfAllOrders,
};
