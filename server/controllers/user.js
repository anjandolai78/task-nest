const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const { register, login, logout,userDetails } = require("../services/user"); 

router.post("/register", register); 
router.post("/login", login);
router.post("/logout", logout);
router.get("/userDetails",authMiddleware, userDetails);
module.exports = router;