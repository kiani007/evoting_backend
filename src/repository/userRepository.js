import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userRepository = {
    createUser: async (user) => {
        const createUser = await prisma.user.create({ data: user });

        if (!createUser) {
            return {
                status: 500,
                message: 'Failed to create user'
            };
        }
        return {
            status: 200,
            message: 'User created successfully',
            data: createUser
        };
    },
    //signup get user by uid 
    getUserById: async (uid) => {
        try {
            const getUser = await prisma.user.findFirst({ where: { uid: uid } });
            if (!getUser) {
                return {
                    status: 400,
                    message: 'User Not Found',
                    data: null
                };
            }
            return {
                status: 200,
                message: 'User Exists',
                data: getUser
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Failed to get user',
                error: error.message
            };
        }
    },

    getMeUser: async (userId) => {
        try {
            const getUser = await prisma.user.findUnique({
                where: {
                    id: userId
                }
            });
         
          if (!getUser) {
            return {
              status: 500,
              message: "Failed to get user",
            };
          }
          return getUser;
        } catch (error) {
          console.error("Error fetching user:", error.message);
          return {
            status: 500,
            message: "An error occurred while fetching the user",
            error: error.message,
          };
        }
      },

    updateUser: async (user) => {
        try {
            const updateUser = await prisma.user.update({ where: { uid: user.uid }, data: user });
            return {
                status: 200,
                message: 'User updated successfully',
                data: updateUser
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Failed to update user',
                error: error.message
            };
        }
    },

    deleteUser: async (uid) => {
        try {
            const deleteUser = await prisma.user.delete({ where: { uid: uid } });
            return {
                status: 200,
                message: 'User deleted successfully',
                data: deleteUser
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Failed to delete user',
                error: error.message
            };
        }
    }
};

export default userRepository;
