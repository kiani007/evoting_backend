import { Router } from "express";
import CandidateController from "../controllers/CandidatesController.js";
import authenticateJWT from "../middleware/AuthenticateMiddleware.js";
import multer from "multer";
import checkVotingTime from "../middleware/TimeDurationMiddlleware.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const candidateRouter = Router();
candidateRouter.post(
  "/add-candidate",
  authenticateJWT,
  CandidateController.addCandidate
);
candidateRouter.get(
  "/all-candidate",
  authenticateJWT,
  CandidateController.getAllCandidate
);
candidateRouter.get(
  "/get-candidate-by-id",
  authenticateJWT,
  CandidateController.getCandidateById
);
candidateRouter.post(
  "/update-candidate-by-id",
  authenticateJWT,
  CandidateController.updateCandidate
);
candidateRouter.post(
  "/upload",
  authenticateJWT,
  upload.single("file"),
  CandidateController.uploadFile
);
candidateRouter.get(
  "/vote-to-persident",
  authenticateJWT,
  checkVotingTime,
  CandidateController.addVoteToPresidentCandidte
);
candidateRouter.get(
  "/vote-to-vice",
  authenticateJWT,
  checkVotingTime,
  CandidateController.addVoteToVicePresidentCandidte
);
candidateRouter.get(
  "/get-matrix-result",
  authenticateJWT,
  CandidateController.matrixResult
);
candidateRouter.get(
  "/get-winner-candidte",
  authenticateJWT,
  CandidateController.getWinnerCandidte
);
candidateRouter.delete(
  "/delete-candidate-by-id",
  authenticateJWT,
  CandidateController.deleteCandidateByid
);

candidateRouter.all("*", (req, res) => {
  return res.status(404).json("Not Found");
});
export default candidateRouter;
