import VotingDurationService from "../services/VotingDurationService.js";


const VotingDurationController = {
  setDuration: async (req, res) => {
    try {
      const time = await VotingDurationService.addDuration(req.body);
      return res.status(time.status).json(time);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        status: 400,
        message: "An error occurred during creating duration",
      });
    }
  },

};

export default VotingDurationController;
