const router = require("express").Router();
const loanControllers = require("../controllers/loan.controllers");

router.post("/request", loanControllers.requestLoan);
router.post("/lend", loanControllers.lendMaterial);
router.get("/", loanControllers.getLoans);
router.get("/approved", loanControllers.getApprovedLoans);
router.put("/edit", loanControllers.editMaterial);
router.get("/check", loanControllers.checkIsIssued);
router.post("/return", loanControllers.loanReturn);

module.exports = router;
