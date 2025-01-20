const User = require( "../models/auth.model" );
const validationResult = require("express-validator").validationResult;

exports.addToFavorites = (req, res) => {
  // const kitchenId = req.params.id;
  const dishId = req.body.dishId;
  const userId = req.session.userId; // Accessing the userId from the session

  // Find the user by ID
  User.Fav(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Check if the dish is already in the favoriteDishes array
      if (user.favoriteDishes.includes(dishId)) {
        return res.status(400).send("Dish is already in favorites");
      }

      // Add the dishId to the favoriteDishes array
      user.favoriteDishes.push(dishId);

      // Save the updated user data and return the promise
      return user.save();
    })
    .then(() => {
      res.redirect(req.body.ref);
    })
    .catch((err) => {
      console.log(err);
      ///   res.status(500).send("Error adding dish to favorites");
    });
};

exports.showFavorites = async (req, res) => {
  const userId = req.session.userId; // Accessing the userId from the session

  try {
    // Fetch the user's favorite dishes from the database
    const user = await User.Fav(userId)
      .populate({
        path: "favoriteDishes",
        populate: {
          path: "category_id kitchen_id",
        },
      })
      .exec();

    // Render the favorite page and pass the user's favorite dishes data
    res.render("favorite", { favorites: user.favoriteDishes, isUser: true });
  } catch (err) {
    res.status(500).send("Error fetching user's favorites");
  }
};

exports.removeFromFavorites = (req, res) => {
  const dishId = req.params.dishId;
  const userId = req.session.userId;

  // Find the user by ID
  User.Fav(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Check if the dish is in the favoriteDishes array
      const index = user.favoriteDishes.indexOf(dishId);
      if (index === -1) {
        return res.status(400).send("Dish is not in favorites");
      }

      // Remove the dishId from the favoriteDishes array
      user.favoriteDishes.splice(index, 1);

      // Save the updated user data
      return user.save();
    })
    .then(() => {
      res.redirect("/favorite");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error removing dish from favorites");
    });
};
