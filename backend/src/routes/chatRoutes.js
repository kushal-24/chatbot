import { Router } from "express";
import chatController from "../controllers/chatController.js";


const router= Router();

router.route("/chat").post(chatController);

export default router;