import AuthService from "../services/AuthService.js";

const AuthController = {
  login: async (req, res) => {
    try {
      const loginUser = await AuthService.loginUser(req.body);
      return res.status(loginUser.status).json(loginUser);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        status: 400,
        message: "An error occurred during login",
      });
    }
  },

  signup: async (req, res) => {
    try {
      console.log({ X: req.body });
      const signupUser = await AuthService.signupUser(req.body);
      return res.status(signupUser.status).json(signupUser);
    } catch (error) {
      console.error(error.message);
      return res.status(400).json({
        status: 400,
        message: "An error occurred during signup",
      });
    }
  },
};

export default AuthController;
