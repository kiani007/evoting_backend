import CandidateService from "../services/CandidateService.js";
const CandidateController = {
  addCandidate: async (req, res) => {
    try {
      const candidate = await CandidateService.addNewCandidate(req.body);
      return res.status(candidate.status).json(candidate);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        status: 400,
        message: "An error occurred during creating",
      });
    }
  },
  getAllCandidate: async (req, res) => {
    try {
      const { position } = req.query;
      const candidate = await CandidateService.allCandidate(position);
      return res.status(candidate.status).json(candidate);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        status: 400,
        message: "An error occurred during creating",
      });
    }
  },
  getCandidateById: async (req, res) => {
    try {
      const { id } = req.query;
      const candidate = await CandidateService.findCandidate(id);
      return res.status(candidate.status).json(candidate);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        status: 400,
        message: "An error occurred during creating",
      });
    }
  },
  updateCandidate: async (req, res) => {
    try {
      const { id } = req.query;

      const candidate = await CandidateService.updateCandidate(id, req.body);
      return res.status(candidate.status).json(candidate);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        status: 400,
        message: "An error occurred during creating",
      });
    }
  },
  addVoteToPresidentCandidte: async (req, res) => {
    try {
      const { id } = req.query;
      const userId = req.user.data.id;
      const candidate = await CandidateService.votePresidentCandidate(
        userId,
        id
      );

      return res.status(candidate.status).json(candidate);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        status: 400,
        message: "An error occurred during creating",
      });
    }
  },
  addVoteToVicePresidentCandidte: async (req, res) => {
    try {
      const { id } = req.query;
      const userId = req.user.data.id;
      const candidate = await CandidateService.voteVicePresidentCandidate(
        userId,
        id
      );

      return res.status(candidate.status).json(candidate);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        status: 400,
        message: "An error occurred during creating",
      });
    }
  },
  uploadFile: async (req, res) => {
    try {
      const candidateId = req.query;
      console.log({ X: candidateId.candidateId });
      const result = await CandidateService.uploadImage(
        candidateId.candidateId,
        req.file
      );
      return res.status(result.status).json(result);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        status: 400,
        message: "An error occurred during file upload",
      });
    }
  },

  matrixResult: async (req, res) => {
    try {
      const result = await CandidateService.getResult()
      return res.status(result.status).json(result);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        status: 400,
        message: "An error occurred during get Result",
      });
    }
  },

  getWinnerCandidte: async (req, res) => {
    try {
      const position = req.query;
      const result = await CandidateService.getWinner(position.position)
      return res.status(result.status).json(result);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        status: 400,
        message: "An error occurred during get Result",
      });
    }
  },
  deleteCandidateByid: async (req, res) => {
    try {
      const { id } = req.query;
      const candidate = await CandidateService.deleteCandidate(id);
      return res.status(candidate.status).json(candidate);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        status: 400,
        message: "An error occurred during deleting",
      });
    }
  },
};
export default CandidateController;
