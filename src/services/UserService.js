import userRepository from '../repository/userRepository.js';


const UserService = {
    getUser: async (userId) => {
        const getUser = await userRepository.getMeUser(userId);
        if (!getUser) {
            return {
                status: 500,
                message: 'Failed to get users'
            };
        }
        return  getUser
    },
    updateUser: async (body,imageUrl,userId) => {

        const updateUser = await userRepository.updateUser(body,imageUrl,userId);
        if (updateUser.status !== 200) {
            return {
                status: 500,
                message: 'Failed to update user'
            };
        }
        return {
            status: 200,
            message: 'User updated successfully',
            data: updateUser.data
        };
    },
    deleteUser: async (id) => {
        const deleteUser = await userRepository.deleteUser(id);
        if (deleteUser.status !== 200) {
            return {
                status: 500,
                message: 'Failed to delete user'
            };
        }
        return {
            status: 200,
            message: 'User deleted successfully',
            data: deleteUser.data
        };
    },
    getUserById: async (id) => {
        const getUser = await userRepository.getUserById(id);
        if (getUser.status === 200) {
            return getUser;
        }
        return {
            status: 200,
            message: 'User Already Exists',
            data: getUser.data
        };
    },
    uploadImage: async (userId, file) => {
        try {
        console.log({userId});
            const result = await userRepository.uploadImageX(userId, file);
        
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
      },
};

export default UserService;
