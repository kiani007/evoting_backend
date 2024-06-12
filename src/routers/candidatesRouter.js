import { Router } from "express";
import CandidateController from "../controllers/CandidatesController.js";
import authenticateJWT from "../middleware/AuthenticateMiddleware.js";

const candidateRouter = Router();
candidateRouter.post('/add-candidate',authenticateJWT, CandidateController.addCandidate);
candidateRouter.get('/all-candidate',authenticateJWT, CandidateController.getAllCandidate);
candidateRouter.get('/get-candidate-by-id',authenticateJWT, CandidateController.getCandidateById);

candidateRouter.all("*", (req, res) => {
  return res.status(404).json("Not Found");
});
export default candidateRouter;
 