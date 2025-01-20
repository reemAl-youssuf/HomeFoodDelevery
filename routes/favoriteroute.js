const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;
const authGuard = require("./guard/auth.guard");

const favoriteController = require("../controllers/favoriteController");

// Route for adding a dish to favorites
router.post(
  "/addToFavorites",
  authGuard.isAuth,
  bodyParser.urlencoded({ extended: true }),
  favoriteController.addToFavorites
);
router.post(
  "/removeFromFavorites/:dishId",
  authGuard.isAuth,
  bodyParser.urlencoded({ extended: true }),
  favoriteController.removeFromFavorites
);

// Route for showing the user's favorite dishes
router.get(
  "/favorite",
  authGuard.isAuth,
  bodyParser.urlencoded({ extended: true }),
  favoriteController.showFavorites
);

module.exports = router;
