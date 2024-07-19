import { Router } from "express";
import authenticateJWT from "../middleware/AuthenticateMiddleware.js";
import FeedbackController from "../controllers/FeedbackController.js";



const feedbackRouter = Router();
feedbackRouter.post('/add-feedback', authenticateJWT, FeedbackController.addFeedback);

feedbackRouter.all("*", (req, res) => {
    return res.status(404).json("Not Found");
});

export default feedbackRouter;
    