import express from "express";
import { registerUser, loginUser } from "../services/userService";
import { validateUser } from "../middlewares/validateUser";
import { validateLogin } from "../middlewares/validateLogin";

const router = express.Router();
router.post("/register", validateUser, registerUser);
router.post("/login", validateLogin, loginUser);

export default router;