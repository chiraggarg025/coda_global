const express = require("express");
const passport = require("../config/passport-jwt-strategy")
const router = express.Router();
const userController = require("../controllers/user_controller");

// route to register a new user
router.post("/register", userController.register);
// route to add new post
router.post("/:id/new_post", userController.addPost);
// route to create a session
router.post("/login", userController.createSession);
// get all the images for a user
router.get("/:id/get_all_user_image", userController.getAllUserImage);
// get all the user images
router.get("/get_all", userController.getAll);
module.exports = router;
