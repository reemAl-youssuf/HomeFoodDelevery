const router = require("express").Router();
const KitchenController = require("../controllers/kitchenController");
router.get("/", KitchenController.getkitchen);

module.exports = router;
