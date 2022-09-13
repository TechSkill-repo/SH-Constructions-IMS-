const router = require("express").Router();
const storeControllers = require("../controllers/store.controllers");

router.get("/", storeControllers.getMaterials);

module.exports = router;
