import { Router } from "express";
import authenticateJWT from "../middleware/AuthenticateMiddleware.js";
import FeedbackController from "../controllers/FeedbackController.js";


const feedbackRouter = Router();
feedbackRouter.post('/add-feedback', authenticateJWT, FeedbackController.addFeedback);
feedbackRouter.get('/get-feedback', authenticateJWT, FeedbackController.getAllFeedback);
feedbackRouter.get('/get-me-feedback', authenticateJWT, FeedbackController.getUserFeedback);
feedbackRouter.all("*", (req, res) => {
    return res.status(404).json("Not Found");
});

export default feedbackRouter;
    