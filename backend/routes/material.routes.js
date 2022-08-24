const router = require("express").Router();
const materialControllers = require("../controllers/material.controllers");

router.post("/requisition", materialControllers.requisition);
router.get("/query", materialControllers.getMaterial);
router.post("/consumable-inv/add", materialControllers.postConsumableItem);
router.post("/non-consumable-inv/add", materialControllers.postNonConsumableItem);
router.get("/consumable-inv/get", materialControllers.getConsumableItem);
router.get("/non-consumable-inv/get", materialControllers.getNonConsumableItem);

module.exports = router;
