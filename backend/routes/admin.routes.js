const router = require("express").Router();
const adminControllers = require("../controllers/admin.controllers");

router.post("/requisition", adminControllers.requisition);
router.get("/query", adminControllers.getMaterial);
router.get("/issue/query", adminControllers.getIssuedMaterial);
router.get("/accept/query", adminControllers.getAcceptedMaterial);
router.put("/issue/edit", adminControllers.editMaterial);
router.put("/accept/edit", adminControllers.editIssuedMaterial);
router.post("/issue/consumable", adminControllers.issueConsumableMaterial);
router.post("/issue/non-consumable", adminControllers.issueNonConsumableMaterial);
router.post("/accept/consumable", adminControllers.acceptConsumableMaterial);
router.post("/accept/non-consumable", adminControllers.acceptNonConsumableMaterial);
router.get("/accept/check", adminControllers.checkIsAccepted);

module.exports = router;
