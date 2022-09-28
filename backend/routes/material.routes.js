const router = require("express").Router();
const materialControllers = require("../controllers/material.controllers");

router.get("/fetch", materialControllers.fetchDetails);
router.get("/codes", materialControllers.getMcodes);
router.get("/requests", materialControllers.getRequests);
router.get("/materials", materialControllers.getMaterials);

module.exports = router;
