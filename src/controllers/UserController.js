import UserService from "../services/UserService.js";
import multer from 'multer';


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
            message: 'Failed to get user'
        });
    },
    updateUser: async (req, res) => {
        const userId = req.user.data.id;
        const file = req.file;
        let imageUrl;
console.log({file});
        if (file) {
            const filePath = `/uploads/${file.originalname}`;
            require('fs').writeFileSync(`./public${filePath}`, file.buffer);
            imageUrl = filePath;
          }
        if (userId) {
            const updatedUser = await UserService.updateUser(req.body,imageUrl,userId);
            return res.status(updatedUser.status).json(updatedUser);
        }
        return res.status(500).json({
            status: 500,
            message: 'Failed to update user'
        });
    },
    deleteUser: async (req, res) => {
        const id = req.params.uid;
        const deletedUser = await UserService.deleteUser(id);
        return res.status(deletedUser.status).json(deletedUser);
    },
    getUserById: async (req, res) => {
        const id = req.params.uid;
        console.log({id});
        const user = await UserService.getUserById(id);
        return res.status(user.status).json(user);
    }
};

export default UserController;
