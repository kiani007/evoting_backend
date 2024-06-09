import UserService from "../services/UserService.js";

const UserController = {
    getUser: async (req, res) => {
        const { data: user } = req.user;
        console.log(user)

        if (user && user.uid) {
            return res.status(200).json({
                status: 200,
                message: 'User fetched successfully',
                data: user
            });
        }
        return res.status(500).json({
            status: 500,
            message: 'Failed to get user'
        });
    },
    updateUser: async (req, res) => {
        const { data : user } = req.user;
        if (user && user.uid) {
            const updatedUser = await UserService.updateUser(req.body);
            return res.status(updatedUser.status).json(updatedUser);
        }
        return res.status(500).json({
            status: 500,
            message: 'Failed to update user'
        });
    },
    deleteUser: async (req, res) => {
        const { uid } = req.params;
        const deletedUser = await UserService.deleteUser(uid);
        return res.status(deletedUser.status).json(deletedUser);
    },
    getUserById: async (req, res) => {
        const { uid } = req.params;
        const user = await UserService.getUserById(uid);
        return res.status(user.status).json(user);
    }
};

export default UserController;
