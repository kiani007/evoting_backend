import jwt from "jsonwebtoken";
import userRepository from "../repository/userRepository.js";

const AuthService = {
    loginUser: async (query) => {
        try {
            
            const user = {
                email: query.email,
                uid: query.uid
            };

            if (!user.email || !user.uid) {
                return {
                    status: 400,
                    message: 'All fields are required'
                };
            }

            const getUser = await userRepository.getUserByEmailandUid(user.uid, user.email);
            if (getUser.status !== 200) return getUser;

            const tokenPayload = {
                status: getUser.status,
                message: getUser.message,
                data: getUser.data
            };

            const token = AuthService.generateToken(tokenPayload);

            return {
                status: 200,
                token: token,
                user: getUser.data,
                message: 'Login successful',
            };
        } catch (error) {
            console.error(error.message);
            return {
                status: 400,
                message: 'An error occurred during login'
            };
        }
    },

    signupUser: async (body) => {
        try {
            const user = {
                first_name: body.first_name,
                last_name: body.last_name,
                number: body.number,
                email: body.email,
                cnic:body.cnic,
                uid: body.uid
            };

            if (!user.first_name || !user.email || !user.last_name || !user.number || !user.cnic || !user.uid) {
                return {
                    status: 400,
                    message: 'All fields are required'
                };
            }

            const getUser = await userRepository.getUserByEmailandUid(user.uid, user.email,user.cnic);
            if (getUser.status === 200) return { status: 409, message: "User already exists" };

            const createUser = await userRepository.createUser(user);
            if (createUser.status !== 200) return { status: 400, message: 'Failed to create user' };

            const tokenPayload = {
                status: createUser.status,
                message: createUser.message,
                data: createUser.data
            };

            const token = AuthService.generateToken(tokenPayload);

            return {
                status: 200,
                user: createUser.data,
                message: 'Signup successful',
                token: token
            };
        } catch (error) {
            console.error(error.message);
            return {
                status: 400,
                message: 'An error occurred during signup'
            };
        }
    },

    generateToken: (payload) => {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
    }
};

export default AuthService;
