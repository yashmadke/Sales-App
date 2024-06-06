const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const salesSchema = new mongoose.Schema(
  {
    productname: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    author: {
      type: ObjectId,
      ref: "UserModel",
    },
  },

  { timestamps: true }
);

const SalesModel = mongoose.model("SalesModel", salesSchema);

module.exports = SalesModel;
