import UserService from "../services/UserService.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const UserController = {
  getUser: async (req, res) => {
    const userId = req.user.data.id;
    const Me = await UserService.getUser(userId);
    if (Me) {
      return res.status(200).json({
        status: 200,
        message: "User fetched successfully",
        data: Me,
      });
    }
    return res.status(500).json({
      status: 500,
      message: "Failed to get user",
    });
  },
  updateUser: async (req, res) => {
    const userId = req.user.data.id;
    const file = req.file;
    let imageUrl;
    console.log({ file });
    if (file) {
      const filePath = `/uploads/${file.originalname}`;
      require("fs").writeFileSync(`./public${filePath}`, file.buffer);
      imageUrl = filePath;
    }
    if (userId) {
      const updatedUser = await UserService.updateUser(req.body, userId);
      return res.status(updatedUser.status).json(updatedUser);
    }
    return res.status(500).json({
      status: 500,
      message: "Failed to update user",
    });
  },
  updateUserById: async (req, res) => {
    const userId = req.params.id;
    const file = req.file;
    if (file) {
      const filePath = `/uploads/${file.originalname}`;
      require("fs").writeFileSync(`./public${filePath}`, file.buffer);
      imageUrl = filePath;
    }
    if (userId) {
      const updatedUser = await UserService.updateUser(req.body, userId);
      return res.status(updatedUser.status).json(updatedUser);
    }
    return res.status(500).json({
      status: 500,
      message: "Failed to update user",
    });
  },
  deleteUser: async (req, res) => {
    const id = req.params.id;  
    const deletedUser = await UserService.deleteUser(id);
    return res.status(deletedUser.status).json(deletedUser);
  },
  getUserById: async (req, res) => {
    const id = req.params.id;
    console.log({ id });
    const user = await UserService.getUserById(id);
    return res.status(user.status).json(user);
  },
  //   uploadImage: async (req, res) => {
  //     try {
  //       const id = req.params.uid;
  //       const file = req.file;

  //       if (!file) {
  //         throw new Error("File is Missing..");
  //       }

  //       if (!UserService.isValidFileType(file)) {
  //         throw new Error("Invalid file type..");
  //       }

  //       const fileStream = new Readable();
  //       fileStream._read = () => {}; // _read is required but you can noop it
  //       fileStream.push(file.buffer);
  //       fileStream.push(null);

  //       const image = await UserService.uploadImage(
  //         file.originalname,
  //         fileStream,
  //         id
  //       );
  //       return res.status(201).json(image);
  //     } catch (error) {
  //       return res.status(500).json({
  //         status: 500,
  //         message: error.message,
  //       });
  //     }
  //   },

  uploadFile: async (req, res) => {
    try {
      const userId = req.user.data.id;
      const result = await UserService.uploadImage(userId, req.file);
      return res.status(result.status).json(result);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        status: 400,
        message: "An error occurred during file upload",
      });
    }
  },
  getAllUser: async (req, res) => {
    try {
      const user = await UserService.allUser();
      return res.status(user.status).json(user);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        status: 400,
        message: "An error occurred during creating",
      });
    }
  },
  checkEligibility: async(req,res)=>{
    try {
      const userId = req.user.data.id;
      const user = await UserService.userEligibility(userId);
      return res.status(user.status).json(user);
    }catch (error) {
      console.error(error.message);
      return res.status(400).json({
        status: 400,
        message: "An error occurred during creating",
      });
    }
  }
};

export default UserController;
