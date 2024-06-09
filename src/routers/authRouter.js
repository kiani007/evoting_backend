import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const authRouter = Router();

authRouter.post('/login', AuthController.login);
authRouter.post('/signup', AuthController.signup);

authRouter.all("*", (req, res) => {
    return res.status(404).json({
        status: 404,
        message: "Not Found"
    });
});

export default authRouter;
