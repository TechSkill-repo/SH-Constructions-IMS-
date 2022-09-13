const router = require("express").Router();
const requestControllers = require("../controllers/request.controllers");

router.post("/requisition", requestControllers.requisition);
router.get("/query", requestControllers.getMaterial);
router.put("/edit", requestControllers.editMaterial);

module.exports = router;
