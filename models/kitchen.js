const mongoose = require("mongoose");
const Category = require("../models/category");
const DB_URL = "mongodb://127.0.0.1/homefooddelivery";

//Connect to MongoDB
mongoose.connect(DB_URL).then(() => {
  console.log("Connected to MongoDB");
});
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB:", err);
//   });

const kitchenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image_name: { type: String, required: true },
  description: { type: String, required: true },
  nratings: { type: Number },
  discount: { type: Number },
});

const Kitchen = mongoose.model("Kitchen", kitchenSchema);

exports.getAllkitchens = () => {
  return Promise.all([Kitchen.find({}), Category.find({})]);
};

exports.getKitchenById = (id) => {
  return Kitchen.findById(id);
};
