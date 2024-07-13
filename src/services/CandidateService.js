import candidateRepository from "../repository/candidateRepository.js";
import UserService from "./UserService.js";

const Positions = Object.freeze({
  PRESIDENT: "president",
  VICE_PRESIDENT: "vice_president",
});
const isValidPosition = (position) => {
  console.log({ position });
  return Object.values(Positions).includes(position);
};

const CandidateService = {
  addNewCandidate: async (body) => {
    try {
      const data = {
        name: body.name,
        party_name: body.party_name,
        position: body.position,
      };

      if (!data.name || !data.party_name || !data.position) {
        return {
          status: 400,
          message: "All fields are required",
        };
      }
      if (!isValidPosition(data.position)) {
        return {
          status: 400,
          message:
            "Invalid position. Allowed values are: " +
            Object.values(Positions).join(", "),
        };
      }

      const getCandidate = await candidateRepository.createCandidate(data);
      return {
        status: 200,
        user: getCandidate.data,
        message: "Created successful",
      };
    } catch (error) {
      console.error(error.message);
      return {
        status: 400,
        message: "An error occurred during adding candidate",
      };
    }
  },
  allCandidate: async (position) => {
    try {
      const getCandidate = await candidateRepository.findAll(position);
      return {
        status: 200,
        candidates: getCandidate.data,
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
  updateCandidate: async (id, body) => {
    try {
      const getCandidate = await candidateRepository.updateCandidate(id, body);
      return {
        status: 200,
        candidate: getCandidate.data,
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
  findCandidate: async (id) => {
    try {
      const getCandidate = await candidateRepository.findById(id);
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
  votePresidentCandidate: async (userId, id) => {
    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const isPresidentialVoteEmpty =
        !user.data.voted_for_presidential_candidates;

      if (isPresidentialVoteEmpty) {
        const can = await candidateRepository.voteCandidate(
          userId,
          id,
          "president"
        );
        return {
          status: 200,
          candidates: can,
          message: "Vote is Cast to President",
        };
      } else {
        return {
          status: 400,
          message: "Already Voted to President",
        };
      }
    } catch (error) {
      console.error(error.message);
      return {
        status: 400,
        message: "An error occurred during adding candidate",
      };
    }
  },
  voteVicePresidentCandidate: async (userId, id) => {
    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const isVicePresidentialVoteEmpty =
        !user.data.voted_for_vice_presidential_candidates;

      if (isVicePresidentialVoteEmpty) {
        const can = await candidateRepository.voteCandidate(
          userId,
          id,
          "vice_president"
        );
        return {
          status: 200,
          candidates: can,
          message: "Vote is Cast to Vice President",
        };
      } else {
        return {
          status: 400,
          message: "Already Voted to Vice President",
        };
      }
    } catch (error) {
      console.error(error.message);
      return {
        status: 400,
        message: "An error occurred during adding candidate",
      };
    }
  },
  uploadImage: async (candidateId, file) => {
    try {
      console.log({ candidateId });
      const result = await candidateRepository.uploadImageX(candidateId, file);

      return {
        status: 201,
        message: "Image uploaded successfully",
        result,
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

  getResult: async () => {
    try {
      const result = await candidateRepository.matrixResult();
      return result;
    } catch (error) {
      console.error(error.message);
      return {
        status: 500,
        message: "Failed to Get Result",
        error: error.message,
      };
    }
  },
  getWinner: async (pos) => {
    try {
      const result = await candidateRepository.getTheWinnerCandidte(pos);
      return result;
    } catch (error) {
      console.error(error.message);
      return {
        status: 500,
        message: "Failed to Get Result",
        error: error.message,
      };
    }
  },
};
export default CandidateService;
