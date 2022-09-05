const router = require("express").Router();

const criticalTools = require("../controllers/criticalTools.controllers");

router.post("/", criticalTools.postCriticalTools);

module.exports = router;
