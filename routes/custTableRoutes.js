const { Router } = require("express");
const menuController = require("../controllers/menuController");
const custTableController = require("../controllers/custTableController");
const pool = require("../db");
const router = new Router();

router.get("/menu", (req, res) => {
  res.setHeader("content-type", "application/json");
  menuController
    .getAllItems()
    .then((items) => {
      res.end(JSON.stringify(items));
    })
    .catch((error) => {
      res.end(error.toString());
    });
});

router.get("/", (req, res) => {
  res.setHeader("content-type", "application/json");
  custTableController
    .getAllTables()
    .then((tables) => {
      res.send(JSON.stringify(tables));
    })
    .catch((error) => {
      res.send(error.toString());
    });
});

router.get("/:id", (req, res) => {
  res.setHeader("content-type", "application/json");
  custTableController
    .getTableById(req.params.id)
    .then((table) => {
      res.send(JSON.stringify(table));
    })
    .catch((error) => {
      res.send(error.toString());
    });
});

router.put("/", (req, res) => {
  res.setHeader("content-type", "application/json");
  custTableController
    .updateTable(req.body)
    .then((table) => {
      custTableController
        .getTableById(table.table_id)
        .then((table) => {
          res.send(JSON.stringify(table));
        })
        .catch((error) => {
          res.send(error.toString());
        });
    })
    .catch((error) => {
      res.send(error.toString());
    });
});

router.post("/", (req, res) => {
  custTableController
    .addTable(req.body)
    .then((result) => {
      console.log(result);
      res.send(JSON.stringify({ success: "Table Created Successfully" }));
    })
    .catch((error) => {
      res.send(error.toString());
    });
});

router.delete("/:id", (req, res) => {
  custTableController
    .deleteTable(req.params.id)
    .then((table) => {
      res.send(JSON.stringify(table));
    })
    .catch((error) => {
      res.send(error.toString());
    });
});
module.exports = router;
