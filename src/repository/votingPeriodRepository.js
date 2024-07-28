import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const votingPeriodRepository = {
  setDurationTime: async (startTime, endTime) => {
    // Fetch the first entry
    const existingVotingPeriod = await prisma.votingPeriod.findFirst();

    if (existingVotingPeriod) {
      // Update the existing entry
      const updatedVotingPeriod = await prisma.votingPeriod.update({
        where: { id: existingVotingPeriod.id },
        data: { startTime, endTime },
      });
      return updatedVotingPeriod;
    } else {
      // Create a new entry if none exists
      const newVotingPeriod = await prisma.votingPeriod.create({
        data: { startTime, endTime },
      });
      return newVotingPeriod;
    }
  },
};

export default votingPeriodRepository;
