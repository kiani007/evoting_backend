import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const candidateRepository = {
  createCandidate: async (can) => {
    const createCandidate = await prisma.candidtes.create({
      data: { ...can, vote_counter: 0, image: null },
    });

    if (!createCandidate) {
      return {
        status: 500,
        message: "Failed to create Candidate",
      };
    }
    return {
      status: 200,
      message: "Candidate created successfully",
      data: createCandidate,
    };
  },

  findAll: async (position) => {
    const filter = position ? { where: { position: position } } : {};
    const all = await prisma.candidtes.findMany(filter);
    if (!all) {
      return {
        status: 500,
        message: "Failed to find Candidates",
      };
    }
    return {
      status: 200,
      message: "Fetch all Candidate successfully",
      data: all,
    };
  },
  findById: async (id) => {
    try {
      const candidate = await prisma.candidtes.findUnique({
        where: { id: id },
      });
      if (!candidate) {
        return {
          status: 404,
          message: "Candidate not found",
        };
      }
      console.log({candidate});
      return candidate;
    } catch (error) {
      console.error(error.message);
      return {
        status: 500,
        message: "An error occurred during fetching candidate",
      };
    }
  },

  voteCandidate: async (id) => {
    try {
      const can = await prisma.candidtes.findUnique({
        where: { id: id }
      });
      if (can) {
        console.log({can});
        const updatedCandidate = await prisma.candidtes.update({
          where: { id: id },
          data: {
            vote_counter: {
              increment: 1 // Use the increment operation to add 1 to the current value
            }
          }
        });
       return updatedCandidate;
      } else {
        return {
          status: 404,
          message: "Candidate not found"
        };
      }
    } catch (error) {
      console.error(error.message);
      return {
        status: 400,
        message: "An error occurred during voting"
      };
    }
  },
  
};
export default candidateRepository;
