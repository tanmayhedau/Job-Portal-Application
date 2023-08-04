import express from "express";
import { userAuth } from "../middlewares/authMiddleware.js";
import { getUser, userController } from "../controllers/userController.js";

const router = express.Router();

router.put("/update-user", userAuth, userController);
router.post("/getuser", userAuth, getUser);

export default router;
