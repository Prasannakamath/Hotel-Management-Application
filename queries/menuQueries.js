const getAllItems = 'select * from "hotelManagement".menu';

const addItem =
  'insert into "hotelManagement".menu(item_name,item_price,item_calories,instock,rawmaterial) values($1,$2,$3,$4,$5)';

const checkIfItemExists =
  'select * from "hotelManagement".menu where item_name=$1';

const updateItem =
  'update "hotelManagement".menu set item_price=$2,item_calories=$3,instock=$4,rawmaterial=$5 where item_name=$1';

const getItemByName = 'select * from "hotelManagement".menu where item_name=$1';

const deleteItemByName =
  'delete from "hotelManagement".menu where item_name=$1';

const deleteItemById = 'delete from "hotelManagement".menu where id=$1';

module.exports = {
  getAllItems,
  addItem,
  checkIfItemExists,
  updateItem,
  getItemByName,
  deleteItemByName,
  deleteItemById,
};
