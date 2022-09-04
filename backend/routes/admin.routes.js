const router = require("express").Router();
const adminControllers = require("../controllers/admin.controllers");

router.post("/requisition", adminControllers.requisition);
router.get("/query", adminControllers.getMaterial);
router.put("/edit", adminControllers.editMaterial);
router.post("/consumable", adminControllers.issueConsumableMaterial);
router.post("/non-consumable", adminControllers.issueNonConsumableMaterial);

module.exports = router;
