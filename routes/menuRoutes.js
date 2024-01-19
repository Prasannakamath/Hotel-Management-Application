const { Router } = require("express");
const menuController = require("../controllers/menuController");
const router = new Router();

router.get("/", (req, res) => {
  // res.send("get all items in the menu");
  res.setHeader("content-type", "application/json");
  menuController
    .getAllItems()
    .then((items) => {
      res.end(JSON.stringify(items));
    })
    .catch((error) => {
      res.end(error);
    });
});

router.post("/", (req, res) => {
  let reqBody = req.body;
  menuController
    .addItem(reqBody)
    .then(() => {
      res.end(`Item ${reqBody.name} added in the menu.`);
    })
    .catch((error) => {
      res.end(error.toString());
    });
});

router.put("/", (req, res) => {
  menuController
    .updateItem(req.body)
    .then((rows) => {
      console.log("Item updated successfully");
      res.setHeader("content-type", "application/json");
      res.end(JSON.stringify(rows));
    })
    .catch((error) => {
      res.end(error.toString());
    });
});

router.delete("/:name", (req, res) => {
  let itemName = req.params.name;
  menuController
    .deleteItemByName(itemName)
    .then((result) => {
      res.setHeader("content-type", "application/json");
      res.end(
        `{"message": "Item ${
          result.item_name
        } deleted successfully","item":${JSON.stringify(result)}}`
      );
    })
    .catch((error) => {
      console.log(error);
      res.end();
    });
});

module.exports = router;
