import { Router } from "express";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import candidateRouter from "./candidatesRouter.js";
import feedbackRouter from "./feedbackRouter.js";

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/candidate',candidateRouter)
router.use('/feedback',feedbackRouter)
router.all("*", (req, res) => {
   return res.status(404).json("Not Found");
})

export default router;