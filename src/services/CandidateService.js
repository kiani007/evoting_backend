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
  findCandidate: async (id) => {
    try {
      const getCandidate = await candidateRepository.findById(id);
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
};
export default CandidateService;
