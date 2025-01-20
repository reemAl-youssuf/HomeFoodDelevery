const Dishes = require("../models/dishes");
const Category = require("../models/category");
const Kitchen = require("../models/kitchen");

exports.getDishes = async (req, res) => {
  const id = req.params.id;
  try {
    const kitchen = await Kitchen.getKitchenById(id);
    if (!kitchen) {
      console.log("Kitchen not found", id);
      return res.status(404).send("Kitchen not found");
    }
    const dishes = await Dishes.getAllDishes(id).populate("category_id").exec();
    const categories = await Category.find();
    //console.log( id );
    res.render("dishes", {
      kitchen: kitchen,
      dishes: dishes,
      categories: categories,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.searchDishes = async (req, res) => {
  const id = req.params.id;
  const query = req.query.query;
  try {
    const kitchen = await Kitchen.getKitchenById(id);
    if (!kitchen) {
      console.log("Kitchen not found", id);
      return res.status(404).send("Kitchen not found");
    }

    const dishes = await Dishes.searchDishes(id, query);
    const categories = await Category.find();

    res.render("dishes", {
      kitchen: kitchen,
      dishes: dishes,
      categories: categories,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.filterDishes = async (req, res) => {
  const id = req.params.id;
  const categoryId = req.query.category;

  try {
    const kitchen = await Kitchen.getKitchenById(id);
    if (!kitchen) {
      console.log("Kitchen not found", id);
      return res.status(404).send("Kitchen not found");
    }
    let filteredDishes;

    // Check if a category ID is provided for filtering
    if (categoryId) {
      filteredDishes = await Dishes.filterByCategory(id, categoryId)
        .populate("category_id")
        .exec();
    } else {
      // If no category ID is provided, return all dishes
      filteredDishes = await Dishes.getAllDishes(id)
        .populate("category_id")
        .exec();
    }
    const categories = await Category.find();

    res.render("dishes", {
      kitchen: kitchen,
      dishes: filteredDishes,
      categories: categories,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
};
exports.getDishDetails = async (req, res) => {
  const dishId = req.params.dishId;
  try {
    // Fetch the dish details and populate the 'category_id' and 'kitchen_id' fields
    const dish = await Dishes.getDishDetails(dishId).populate(
      "category_id kitchen_id"
    );

    if (!dish) {
      console.log("Dish not found", dishId);
      return res.status(404).send("Dish not found");
    }

    // Render the dish details view and pass the fetched dish data
    res.render("dish-details", { dish });
  } catch (error) {
    // Handle error
    console.error("Error retrieving dish details:", error);
    res.status(500).send("Error retrieving dish details");
  }
};
