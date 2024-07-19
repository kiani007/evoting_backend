import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const feedbackRepository = {
  submitFeedback: async (data, userId) => {
    console.log("xxxxxxxxxx",data);
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
};

export default feedbackRepository;
