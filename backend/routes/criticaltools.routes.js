const router = require("express").Router();

const criticalTools = require("../controllers/criticalTools.controllers");

router.post("/", criticalTools.postCriticalTools);
router.get("/", criticalTools.getCriticalTools);
router.put("/edit", criticalTools.editCriticalTools);
router.delete("/delete", criticalTools.deleteCriticalTools);

module.exports = router;
