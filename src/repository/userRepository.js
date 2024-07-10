import { PrismaClient } from "@prisma/client";
import fs from "fs";
const prisma = new PrismaClient();

const userRepository = {
  createUser: async (user) => {
    const createUser = await prisma.user.create({ data: user });

    if (!createUser) {
      return {
        status: 500,
        message: "Failed to create user",
      };
    }
    return {
      status: 200,
      message: "User created successfully",
      data: createUser,
    };
  },
  //signup get user by uid
  getUserById: async (id) => {
    try {
      const getUser = await prisma.user.findFirst({ where: { id: id } });
      if (!getUser) {
        return {
          status: 400,
          message: "User Not Found",
          data: null,
        };
      }
      return {
        status: 200,
        message: "User Exists",
        data: getUser,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Failed to get user",
        error: error.message,
      };
    }
  },

  getMeUser: async (userId) => {
    try {
      const getUser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
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

  updateUser: async (user, userId) => {
    try {
      // Ensure unique identifier is provided and not undefined
      if (!userId) {
        throw new Error(
          "Unique identifier (id, uid, email, or cnic) must be provided."
        );
      }
      console.log({ userId });
      const updateUser = await prisma.user.update({
        where: { id: userId },
        data: {
          ...user,
          is_authorized: user.is_authorized ?? false,
          voted_for_presidential_candidates:
            user.voted_for_presidential_candidates ?? "",
          voted_for_vice_presidential_candidates:
            user.voted_for_vice_presidential_candidates ?? "",
        },
      });
      console.log({ updateUser });
      return {
        status: 200,
        message: "User updated successfully",
        data: updateUser,
      };
    } catch (error) {
      console.error("Error updating user:", error);
      return {
        status: 500,
        message: "Failed to update user",
        error: error.message,
      };
    }
  },

  deleteUser: async (id) => {
    try {
      const deleteUser = await prisma.user.delete({ where: { uid: id } });
      return {
        status: 200,
        message: "User deleted successfully",
        data: deleteUser,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Failed to delete user",
        error: error.message,
      };
    }
  },

  getUserByEmailandUid: async (uid, email, cnic) => {
    try {
      const getUser = await prisma.user.findFirst({
        where: { uid: uid, email: email, cnic: cnic },
      });
      if (!getUser) {
        return {
          status: 400,
          message: "User Not Found",
          data: null,
        };
      }
      return {
        status: 200,
        message: "User Exists",
        data: getUser,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Failed to get user",
        error: error.message,
      };
    }
  },
  uploadImageX: async (userId, file) => {
    try {
      if (!file) {
        throw new Error("File is missing");
      }
      console.log({ userId });
      const filePath = `/uploads/${file.originalname}`;
      await fs.promises.writeFile(`./public${filePath}`, file.buffer);
      // Update the user's image path in the database

      const updateUser = await prisma.user.update({
        where: { id: userId },
        data: {
          photo: filePath ?? null,
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
  findAll: async () => {
    const all = await prisma.user.findMany();
    if (!all) {
      return {
        status: 500,
        message: "Failed to find User",
      };
    }
    return {
      status: 200,
      message: "Fetch all User successfully",
      data: all,
    };
  }
};

export default userRepository;
