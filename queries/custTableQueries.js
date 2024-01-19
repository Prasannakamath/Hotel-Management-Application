const getAllTables = 'select * from "hotelManagement".custtable';

const addNewTable =
  'insert into "hotelManagement".custtable(table_id,waiter_id,isreserved,isoccupied)values($1,$2,$3,$4)';

const updateTableById =
  'update "hotelManagement".custtable set waiter_id=$2,isreserved=$3,isoccupied=$4 where table_id=$1';

const deleteTableById =
  'delete from "hotelManagement".custtable where table_id=$1';

const getTableById =
  'select table_id,waiter_id,isreserved,isoccupied from "hotelManagement".custtable where table_id=$1';
module.exports = {
  getAllTables,
  addNewTable,
  updateTableById,
  deleteTableById,
  getTableById,
};
