// middleware/CheckVotingTimeMiddleware.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const checkVotingTime = async (req, res, next) => {
  try {
    // Fetch the voting period from the database
    const votingPeriod = await prisma.votingPeriod.findFirst();
    
    if (!votingPeriod) {
      return res.status(500).send({ message: "Voting period not defined" });
    }

    const currentDateTime = new Date();
    const votingStartTime = new Date(votingPeriod.startTime);
    const votingEndTime = new Date(votingPeriod.endTime);

    // Check if the current time is within the voting period
    if (currentDateTime >= votingStartTime && currentDateTime <= votingEndTime) {
      next();
    } else {
      res.status(403).send({ message: "Voting is only allowed during the specified period" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "An error occurred while checking the voting period" });
  }
};

export default checkVotingTime;
