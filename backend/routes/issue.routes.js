const router = require("express").Router();
const issueControllers = require("../controllers/issue.controllers");

router.post("/consumable", issueControllers.issueConsumableMaterial);
router.post("/non-consumable", issueControllers.issueNonConsumableMaterial);
router.get("/consumable/get", issueControllers.getConsumbaleIssue);
router.get("/non-consumable/get", issueControllers.getNonConsumbaleIssue);

module.exports = router;
