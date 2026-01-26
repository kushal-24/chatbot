import { Router } from "express";
import chatController from "../controllers/chatController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router= Router();

router.route("/chat").post(verifyJWT ,chatController);

export default router;