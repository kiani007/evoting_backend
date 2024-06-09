import { Router } from "express";
import UserController from "../controllers/UserController.js";
import authenticateJWT from "../middleware/AuthenticateMiddleware.js";

const userRouter = Router();
userRouter.get('/get-user', authenticateJWT, UserController.getUser);
userRouter.post('/update', authenticateJWT, UserController.updateUser);
userRouter.delete('/delete/:uid', authenticateJWT, UserController.deleteUser);
userRouter.get('/get-user/:uid', authenticateJWT, UserController.getUserById);

userRouter.all("*", (req, res) => {
    return res.status(404).json("Not Found");
});

export default userRouter;
    