const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;

const authGuard = require("./guard/auth.guard");

const cartController = require( "../controllers/cartController" );
const favoriteController = require("../controllers/favoriteController");

router.get( "/", authGuard.isAuth, cartController.getCart );

router.post(
  "/add",
  authGuard.isAuth,
  bodyParser.urlencoded({ extended: true }),
  cartController.postCart
);
router.post(
  "/delete/:id",
  authGuard.isAuth,
  bodyParser.urlencoded({ extended: true }),
  cartController.postDelete
);
router.post(
  "/addToFavorites",
  authGuard.isAuth,
  bodyParser.urlencoded({ extended: true }),
  favoriteController.addToFavorites
);

router.post(
  "/update",
  authGuard.isAuth,
  bodyParser.urlencoded({ extended: true }),
  cartController.updateQuantity
);

router.post(
  "/checkout",
  authGuard.isAuth,
  bodyParser.urlencoded({ extended: true }),
  cartController.checkout
);
module.exports = router;
