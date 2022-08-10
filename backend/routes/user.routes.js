const router = require("express").Router();
const userControllers = require("../controllers/user.controllers");

router.post("/signup", userControllers.addUser);
router.post("/login", userControllers.getUser);

module.exports = router;
