const router = require("express").Router();
const issueControllers = require("../controllers/issue.controllers");

router.post("/consumable", issueControllers.issueConsumableMaterial);
router.post("/non-consumable", issueControllers.issueNonConsumableMaterial);
router.post("/consumable/accept", issueControllers.acceptConsumableMaterial);
router.post("/non-consumable/accept", issueControllers.acceptNonConsumableMaterial);
router.get("/consumable", issueControllers.getConsumbaleIssue);
router.get("/non-consumable", issueControllers.getNonConsumbaleIssue);
router.get("/consumable/accept", issueControllers.getConsumbaleAccept);
router.get("/non-consumable/accept", issueControllers.getNonConsumbaleAccept);
router.get("/check/accept", issueControllers.checkIsAccepted);
router.put("/edit/accept", issueControllers.editIssuedMaterial);

module.exports = router;
