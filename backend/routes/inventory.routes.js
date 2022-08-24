const router = require("express").Router();
const inventoryControllers = require("../controllers/inventory.controllers");

router.post("/consumable/add", inventoryControllers.postConsumableItem);
router.post("/non-consumable/add", inventoryControllers.postNonConsumableItem);
router.get("/consumable/get", inventoryControllers.getConsumableItem);
router.get("/non-consumable/get", inventoryControllers.getNonConsumableItem);

module.exports = router;
