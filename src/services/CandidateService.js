import fs from 'fs';
import path from 'path';
import candidateRepository from "../repository/candidateRepository.js";

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
  voteCandidate: async (id) => {
    try {
      const can = await candidateRepository.voteCandidate(id)
      return {
        status: 200,
        candidates: can,
        message: "Vote is Cast",
      };
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
    console.log({candidateId});
        const result = await candidateRepository.uploadImageX(candidateId, file);
    
        return {
          status: 201,
          message: 'Image uploaded successfully',
          result,
        };
      } catch (error) {
        console.error(error.message);
        return {
          status: 500,
          message: 'Failed to upload image',
          error: error.message,
        };
      }
  }
};
export default CandidateService;
