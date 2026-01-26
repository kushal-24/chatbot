import { Router } from "express";
import { createUser, deleteUser, getUserDetails, refreshAccessToken, updateProfile, userLogin, userLogout } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router= Router()

router.route("/signup").post(createUser);
router.route("/login").post(userLogin);
router.route("/logout").post(verifyJWT, userLogout);
router.route("/updateprofile").post(verifyJWT, updateProfile);
router.route("/myprofile").get(verifyJWT, getUserDetails);
router.route("/refreshtoken").post(refreshAccessToken);
router.route("/deleteaccount").delete(verifyJWT, deleteUser);
