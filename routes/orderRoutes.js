const { Router } = require("express");
const orderController = require("../controllers/orderController");
const menuController = require("../controllers/menuController");
const router = new Router();

router.get("/", (req, res) => {
  orderController
    .getAllOrders()
    .then((orders) => {
      res.end(JSON.stringify(orders));
    })
    .catch((error) => {
      res.end(error.toString());
    });
});
router.get("/:id", (req, res) => {
  let orderId = req.params.id;
  orderController
    .getOrderById(orderId)
    .then((order) => {
      res.end(JSON.stringify(order));
    })
    .catch((error) => {
      res.end(error.toString());
    });
});

router.post("/", (req, res) => {
  let order = req.body;
  menuController
    .getItemById(order.item_id)
    .then((item) => {
      if (!item.instock) throw new Error("Item not in stock!");
      orderController
        .addOrder(order)
        .then((result) => {
          res.end("Order Created Successfully");
        })
        .catch((error) => {
          res.end(error.toString());
        });
    })
    .catch((error) => {
      res.end(error.toString());
    });
});

router.put("/", (req, res) => {
  let order = req.body;
  orderController
    .modifyOrder(order)
    .then(() => {
      res.end("Order modified successufully");
    })
    .catch((error) => {
      res.end(error.toString());
    });
});

router.delete("/:id", (req, res) => {
  let orderId = req.params.id;
  let item = req.body;
  orderController
    .deleteItemByOrderId(item.item_id, orderId)
    .then((order) => {
      order.message = "Item is deleted from this order.";
      res.end(JSON.stringify(order));
    })
    .catch((error) => {
      res.end(error.toString());
    });
});

router.patch("/:id", (req, res) => {
  let order_id = parseInt(req.params.id);
  res.setHeader("content-type", "application/json");
  orderController
    .markOrderAsComplete(order_id)
    .then((result) => {
      let response = {
        message:
          "Order marked as complete. Cannot modify/delete order further.",
        "order details": result,
      };
      res.end(JSON.stringify(response));
    })
    .catch((error) => {
      res.end(error.toString());
    });
});

module.exports = router;
