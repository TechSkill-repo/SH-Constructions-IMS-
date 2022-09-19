const router = require("express").Router();
const storeControllers = require("../controllers/store.controllers");

router.get("/", storeControllers.getMaterials);
router.post("/destroy", storeControllers.materialDestruct);

module.exports = router;
