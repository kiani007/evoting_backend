import feedbackRepository from "../repository/feedbackRepository.js";

const FeedbackService = {
  addNewFeedback: async (userId, body) => {
    try {
      const data = {
        feedback: body.feedback,
      };
      if (!data.feedback) {
        return {
          status: 400,
          message: "Feedback fields is required",
        };
      }

      const getFeedback = await feedbackRepository.submitFeedback(data, userId);
      return {
        status: 200,
        user: getFeedback.data,
        message: "Created successful",
      };
    } catch (error) {
      console.error(error.message);
      return {
        status: 400,
        message: "An error occurred during adding feedback",
      };
    }
  },
  allFeedback: async () => {
    try {
      const getFeed = await feedbackRepository.findAll();
      return {
        status: 200,
        feedbacks: getFeed,
        message: "fetch successful",
      };
    } catch (error) {
      console.error(error.message);
      return {
        status: 400,
        message: "An error occurred during adding User",
      };
    }
  },
  getMeFeedback: async (userId) => {
    try {
      const getFeed = await feedbackRepository.meFeedback(userId);
      return {
        status: 200,
        feedback: getFeed,
        message: "fetch successful",
      };
    } catch (error) {
      console.error(error.message);
      return {
        status: 400,
        message: "An error occurred during adding User",
      };
    }
  },
};

export default FeedbackService;
