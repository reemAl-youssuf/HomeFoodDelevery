const mongoose = require("mongoose");

const dishesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  newprice: {
    type: Number,
    required: true,
  },
  oldprice: {
    type: Number,
    required: true,
  },
  image_name: {
    type: String,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  kitchen_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Kitchen",
  },
  dratings: { type: Number },
});

const Dishes = mongoose.model("Dishes", dishesSchema);

exports.getAllDishes = (kitchenId) => {
  return Dishes.find({ kitchen_id: kitchenId });
};
exports.searchDishes = (kitchenId, query) => {
  return Dishes.find({
    kitchen_id: kitchenId,
    title: { $regex: query, $options: "i" },
  });
};
exports.filterByCategory = function (kitchenId, categoryId) {
  return Dishes.find({ kitchen_id: kitchenId, category_id: categoryId });
};
exports.getDishDetails = (dishId) => {
  return Dishes.findById(dishId);
};
