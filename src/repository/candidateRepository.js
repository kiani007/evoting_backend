import { PrismaClient } from "@prisma/client";
import fs from "fs";
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
      console.log({ candidate });
      return candidate;
    } catch (error) {
      console.error(error.message);
      return {
        status: 500,
        message: "An error occurred during fetching candidate",
      };
    }
  },

  updateCandidate: async (id, body) => {
    try {
      const getCandidate = await prisma.candidtes.update({
        where: { id: id },
        data: { ...body },
      });
      return {
        status: 200,
        candidate: getCandidate,
        message: "fetch successful",
      };
    } catch (error) {
      console.error(error.message);
      return {
        status: 400,
        message: "An error occurred during adding candidate",
      };
    }
  },

  voteCandidate: async (userId, id, pos) => {
    try {
      const can = await prisma.candidtes.findUnique({
        where: { id },
      });
      console.log({ pos });
      if (can) {
        const updatedCandidate = await prisma.candidtes.update({
          where: { id: id, position: pos },
          data: {
            vote_counter: {
              increment: 1,
            },
          },
        });
        if (can.position == "president") {
          await prisma.user.update({
            where: { id: userId },
            data: {
              voted_for_presidential_candidates: can.name,
            },
          });
        } else {
          await prisma.user.update({
            where: { id: userId },
            data: {
              voted_for_vice_presidential_candidates: can.name,
            },
          });
        }
        return updatedCandidate;
      } else {
        return {
          status: 404,
          message: "Candidate not found",
        };
      }
    } catch (error) {
      console.error(error.message);
      return {
        status: 400,
        message: "An error occurred during voting",
      };
    }
  },
  uploadImageX: async (candidateId, file) => {
    try {
      if (!file) {
        throw new Error("File is missing");
      }
      console.log({ XX: candidateId });
      const filePath = `/uploads/${file.originalname}`;
      await fs.promises.writeFile(`./public${filePath}`, file.buffer);
      // Update the user's image path in the database

      const updateUser = await prisma.candidtes.update({
        where: { id: candidateId },
        data: {
          image: filePath ?? null,
        },
      });

      return {
        data: updateUser,
      };
    } catch (error) {
      console.error(error.message);
      return {
        status: 500,
        message: "Failed to upload image",
        error: error.message,
      };
    }
  },

  matrixResult: async () => {
    try {
      const candidates = await prisma.candidtes.findMany({
        select: {
          id: true,
          name: true,
          party_name: true,
          vote_counter: true,
          position: true,
        },
      });
      return {
        status: 200,
        candidates,
        message: "Data retrieved successfully",
      };
    } catch (error) {
      console.error(error.message);
      return {
        status: 500,
        message: "Failed to upload image",
        error: error.message,
      };
    }
  },

  getTheWinnerCandidte: async (position) => {
    try {
      console.log({position});
      const result = await prisma.$queryRaw`
      SELECT 
          c.name,
          c.party_name,
          c.position,
          c.vote_counter
      FROM 
          "Candidtes" AS c
      WHERE 
          c.vote_counter = (
              SELECT MAX(c2.vote_counter) 
              FROM "Candidtes" AS c2 
              WHERE c2.position = ${position}::text
          )
          AND c.position = ${position}::text
      LIMIT 1;
    `;
       console.log({ result });
    return {
      status: 200,
      candidate: result[0],
      message: "Data retrieved successfully",
    };

   
    } catch (error) {
      console.error(error.message);
      return {
        status: 500,
        message: "Failed to get Result",
        error: error.message,
      };
    }
  },
};
export default candidateRepository;
