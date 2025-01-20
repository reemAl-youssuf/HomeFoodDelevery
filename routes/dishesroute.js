const express = require("express");
const router = express.Router();
const dishesController = require( "../controllers/dishesController" );
router.get("/:id/dishes", dishesController.getDishes);
router.get("/:id/dishes/search", dishesController.searchDishes);
router.get("/:id/dishes/filter", dishesController.filterDishes);
router.get( "/:id/dishes/:dishId/details", dishesController.getDishDetails );

module.exports = router;
