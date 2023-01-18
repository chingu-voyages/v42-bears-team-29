const router = require("express").Router();
const { getUser, updateUser, deleteUser } = require("../controllers/user");

//Get user info
router.post("/", getUser);

//Update user info
router.put("/update", updateUser);

//Delete user
router.delete("/delete/:id", deleteUser);

module.exports = router;
