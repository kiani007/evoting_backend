import FeedbackService from "../services/FeedbackService.js";

const FeedbackController = {
  addFeedback: async (req, res) => {
    try {
      const userId = req.user.data.id;
      const feedback = await FeedbackService.addNewFeedback(userId, req.body);
      return res.status(feedback.status).json(feedback);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        status: 400,
        message: "An error occurred during creating",
      });
    }
  },
};

export default FeedbackController;
