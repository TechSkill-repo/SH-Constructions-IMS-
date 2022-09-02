const router = require("express").Router();
const adminControllers = require("../controllers/admin.controllers");

router.post("/requisition", adminControllers.requisition);
router.get("/query", adminControllers.getMaterial);
router.put("/edit", adminControllers.editMaterial);

module.exports = router;
