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
  getCandidateById: async (req, res)=>{
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
  }
};
export default CandidateController;
