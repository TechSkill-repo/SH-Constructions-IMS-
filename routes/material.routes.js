const router = require("express").Router();
const materialControllers = require("../controllers/material.controllers");

router.get("/fetch", materialControllers.fetchDetails);
router.get("/codes", materialControllers.getMcodes);
router.get("/requests", materialControllers.getRequests);
router.get("/materials", materialControllers.getMaterials);
router.post("/add", materialControllers.addMaterial);
router.put("/edit", materialControllers.editMaterial);
router.get("/total/consumable", materialControllers.getConsumableTotalPrice);
router.get("/total/non-consumable", materialControllers.getNonConsumableTotalPrice);

module.exports = router;
