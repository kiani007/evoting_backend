import userRepository from "../repository/userRepository.js";
import admin from "firebase-admin";

const UserService = {
  getUser: async (userId) => {
    const getUser = await userRepository.getMeUser(userId);
    if (!getUser) {
      return {
        status: 500,
        message: "Failed to get users",
      };
    }
    return getUser;
  },
  updateUser: async (body, userId) => {
    const updateUser = await userRepository.updateUser(body, userId);
    if (updateUser.status !== 200) {
      return {
        status: 500,
        message: "Failed to update user",
      };
    }
    return {
      status: 200,
      message: "User updated successfully",
      data: updateUser.data,
    };
  },
  deleteUser: async (id) => {
    const deleteUser = await userRepository.deleteUser(id);
    if (deleteUser.status !== 200) {
      return {
        status: 500,
        message: "Failed to delete user",
      };
    }
    await admin.auth().deleteUser(id);
    return {
      status: 200,
      message: "User deleted successfully",
      data: deleteUser.data,
    };
  },
  getUserById: async (id) => {
    const getUser = await userRepository.getUserById(id);
    if (getUser.status === 200) {
      return getUser;
    }
    return {
      status: 200,
      message: "User Already Exists",
      data: getUser.data,
    };
  },
  uploadImage: async (userId, file) => {
    try {
      console.log({ userId });
      const result = await userRepository.uploadImageX(userId, file);

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
  allUser: async () => {
    try {
      const getUser = await userRepository.findAll();
      return {
        status: 200,
        users: getUser.data,
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
  userEligibility: async (userId) => {
    try {
      const user = await UserService.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const isPresidentialVoteEmpty =
        !user.data.voted_for_presidential_candidates;
      const isVicePresidentialVoteEmpty =
        !user.data.voted_for_vice_presidential_candidates;

      if (isPresidentialVoteEmpty || isVicePresidentialVoteEmpty) {
        return {
          status: 200,
          message: "User Eligibility",
        };
      }
      return {
        status: 200,
        message: "User not Eligibility",
      };
    } catch (error) {
      console.error(error.message);
      return {
        status: 400,
        message: "An error occurred during checking User",
      };
    }
  },
};

export default UserService;
