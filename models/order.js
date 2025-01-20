const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // Assuming you have a User model
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  items: [
    {
      title: String,
      amount: Number,
      disheId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Dishes",
      },
      oldprice: Number,
      newprice: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
