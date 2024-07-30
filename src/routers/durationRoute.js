import { Router } from "express";
import authenticateJWT from "../middleware/AuthenticateMiddleware.js";
import VotingDurationController from "../controllers/VotingDurationController.js";

const durationRoute = Router();
durationRoute.post('/add-duration', authenticateJWT, VotingDurationController.setDuration);
durationRoute.get('/get-duration', authenticateJWT, VotingDurationController.getDuration);
durationRoute.all("*", (req, res) => {
    return res.status(404).json("Not Found");
});

export default durationRoute;
    