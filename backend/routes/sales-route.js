const express = require("express");
const {
  addSales,
  topSales,
  totalRevenue,
} = require("../controllers/sales-controller");
const authorize = require("../middlewares/authorization");

const router = express.Router();

// defining routes for adding sales, getting top sales and calculate total revenue
router.post("/addSales", authorize, addSales);
router.get("/topSales", authorize, topSales);
router.get("/totalRevenue", authorize, totalRevenue);

module.exports = router;
