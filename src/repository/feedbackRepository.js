import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const feedbackRepository = {
  submitFeedback: async (data, userId) => {
    console.log("xxxxxxxxxx", data);
    const submist = await prisma.feedback.create({
      data: { feedback: data.feedback, userId: userId },
    });

    if (!submist) {
      return {
        status: 500,
        message: "Unable to save feedback of the User",
      };
    }

    return submist;
  },

  findAll: async (userId) => {
    const feed = await prisma.feedback.findMany();
    if (!feed) {
      return {
        status: 500,
        message: "Unable to get all feedback of the User",
      };
    }
    return feed;
  },
  meFeedback: async (userId) => {
    const feed = await prisma.feedback.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!feed) {
      return {
        status: 500,
        message: "Unable to get all feedback of the User",
      };
    }
    return feed;
  },
};

export default feedbackRepository;
