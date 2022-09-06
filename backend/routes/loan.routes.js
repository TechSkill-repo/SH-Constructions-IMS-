const router = require("express").Router();
const loanControllers = require("../controllers/loan.controllers");

router.post("/request", loanControllers.requestLoan);
router.post("/lend", loanControllers.lendMaterial);
router.get("/", loanControllers.getLoans);
router.get("/approved", loanControllers.getApprovedLoans);
router.put("/edit", loanControllers.editMaterial);

module.exports = router;
