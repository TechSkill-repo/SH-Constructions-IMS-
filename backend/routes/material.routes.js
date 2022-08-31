const router = require("express").Router();
const materialControllers = require("../controllers/material.controllers");

router.post("/requisition", materialControllers.requisition);
router.get("/query", materialControllers.getMaterial);
router.put("/edit", materialControllers.editMaterial);
router.get("/fetch", materialControllers.fetchDetails);

module.exports = router;
