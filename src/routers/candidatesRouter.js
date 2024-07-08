import { Router } from "express";
import CandidateController from "../controllers/CandidatesController.js";
import authenticateJWT from "../middleware/AuthenticateMiddleware.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const candidateRouter = Router();
candidateRouter.post('/add-candidate',authenticateJWT, CandidateController.addCandidate);
candidateRouter.get('/all-candidate',authenticateJWT, CandidateController.getAllCandidate);
candidateRouter.get('/get-candidate-by-id', authenticateJWT, CandidateController.getCandidateById);
candidateRouter.post('/update-candidate-by-id',authenticateJWT, CandidateController.updateCandidate);
candidateRouter.get('/vote-to-candidate',authenticateJWT, CandidateController.addVoteToCandidte);
candidateRouter.post('/upload', authenticateJWT, upload.single('file'), CandidateController.uploadFile);

candidateRouter.all("*", (req, res) => {
  return res.status(404).json("Not Found");
});
export default candidateRouter;
 