const SalesModel = require("../models/sales-model");

const addSales = async (req, res) => {
  // destructuring request body
  const { productname, quantity, amount } = req.body;

  if (!productname || !quantity || !amount) {
    return res.status(400).json({ Error: "All fields are mandatory!" });
  }

  // retrieving the authenticated user
  const author = req.user;

  const Sales = new SalesModel({ productname, quantity, amount, author });
  const newSales = await Sales.save();

  // returning appropriate response
  if (newSales) {
    return res.status(200).json({ Message: "Sales added!", newSales });
  } else {
    return res.status(500).json({ Error: "Error adding sales!" });
  }
};

const topSales = async (req, res) => {
  const authorId = req.user._id;

  // aggregate sales data to calculate top sales
  const topSalesData = await SalesModel.aggregate([
    { $match: { author: authorId } },
    {
      $addFields: {
        totalSale: {
          $multiply: ["$quantity", "$amount"],
        },
      },
    },
    { $sort: { totaSale: -1 } },
    { $limit: 5 },
  ]);

  res.status(200).json({ topSalesData });
};

const totalRevenue = async (req, res) => {
  const authorId = req.user._id;

  // determining the start and end of the current day.
  const today = new Date();
  const startOfDay = new Date(today.setUTCHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setUTCHours(23, 59, 59, 999));

  // aggregating sales data to calculate the today's total revenue
  const totalRevenueData = await SalesModel.aggregate([
    {
      $match: {
        author: authorId,
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    },
    {
      $addFields: {
        totalRevenue: {
          $multiply: ["$quantity", "$amount"],
        },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$totalRevenue",
        },
      },
    },
  ]);

  if (totalRevenueData.length > 0) {
    return res.status(200).json({ totalRevenue: totalRevenueData[0].total });
  } else {
    return res.status(200).json({ totalRevenue: 0 });
  }
};

module.exports = { addSales, topSales, totalRevenue };
