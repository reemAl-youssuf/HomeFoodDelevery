const mongoose = require("mongoose");

const DB_URL = "mongodb://127.0.0.1/homefooddelivery";

const cartSchema = mongoose.Schema({
  title: String,
  amount: Number,
  userId: String,
  disheId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Dishes",
  },
  timestamp: Number,
  oldprice: Number,
  newprice: Number,
  totalAmount: {
    type: Number,
    default: 0,
  },
});

cartSchema.methods.updateQuantity = function (newAmount) {
  this.amount = newAmount;
  return this.save();
};


const CartItem = mongoose.model("cart", cartSchema);

exports.addNewItem = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        let item = new CartItem(data);
        return item.save();
      })
      .then(() => {
        // mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.getItemsByUser = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return CartItem.find({ userId: userId }, {}, { sort: { timestamp: 1 } })
          .populate("disheId")
          .exec();
      })
      .then((items) => {
        // mongoose.disconnect();
        resolve(items);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
exports.deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => CartItem.findByIdAndDelete(id))
      .then(() => {
        // mongoose.disconnect();
        resolve();
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

// Update item quantity in the cart
exports.updateItemQuantity = (itemId, newAmount) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then(() => {
        return CartItem.findById(itemId);
      })
      .then((item) => {
        if (!item) {
          throw new Error("Item not found.");
        }
        // Call the instance method to update the quantity
        return item.updateQuantity(newAmount);
      })
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
exports.clearCart = async function (userId) {
  try {
    // Remove all items from the cart for the specified user
    await CartItem.deleteMany({ userId: userId });
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};