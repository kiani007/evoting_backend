import { Router } from "express";
import UserController from "../controllers/UserController.js";
import authenticateJWT from "../middleware/AuthenticateMiddleware.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const userRouter = Router();
userRouter.get('/get-user', authenticateJWT, UserController.getUser);
userRouter.post('/update', authenticateJWT, UserController.updateUser);
userRouter.post('/update/:id', authenticateJWT, UserController.updateUserById);
userRouter.delete('/delete/:id', authenticateJWT, UserController.deleteUser);
userRouter.get('/get-user/:id', authenticateJWT, UserController.getUserById);
userRouter.post('/upload-image', authenticateJWT, upload.single('file'), UserController.uploadFile);
userRouter.get('/all-user',authenticateJWT, UserController.getAllUser);
userRouter.get('/check-eligibility',authenticateJWT, UserController.checkEligibility);


userRouter.all("*", (req, res) => {
    return res.status(404).json("Not Found");
});

export default userRouter;
    