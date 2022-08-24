const router = require("express").Router();
const materialControllers = require("../controllers/material.controllers");

router.post("/requisition", materialControllers.requisition);
router.get("/query", materialControllers.getMaterial);

module.exports = router;
