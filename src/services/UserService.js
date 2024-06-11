import userRepository from "../repository/userRepository.js";

const UserService = {
  getUser: async (userId) => {
    if(!userId){
        return {
            status: 500,
            message: "Failed to get users",
          };
    }
    const getUser = await userRepository.getMeUser(userId);
    if (!getUser) {
      return {
        status: 500,
        message: "Failed to get users",
      };
    }
    return getUser;
  },
  updateUser: async (body) => {
    const updateUser = await userRepository.updateUser(body);
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
  deleteUser: async (uid) => {
    const deleteUser = await userRepository.deleteUser(uid);
    if (deleteUser.status !== 200) {
      return {
        status: 500,
        message: "Failed to delete user",
      };
    }
    return {
      status: 200,
      message: "User deleted successfully",
      data: deleteUser.data,
    };
  },
  getUserById: async (uid) => {
    const getUser = await userRepository.getUserById(uid);
    console.log(getUser);
    if (getUser.status === 200) {
      return getUser;
    }
    return {
      status: 200,
      message: "User Already Exists",
      data: getUser.data,
    };
  },
};

export default UserService;
