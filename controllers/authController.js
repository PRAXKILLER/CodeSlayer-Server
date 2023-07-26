import { UserModel } from "../models/index.js";

const signin = async (req, res) => {
  try {
    const userData = req.body;
    const user = await UserModel.findByEmailOrUsernameAndPassword(userData);
    const token = user.generateJwtToken();

    return res.status(200).json({ token, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const userData = req.body;
    await UserModel.findByEmailAndUsername(userData);
    const user = await UserModel.create(userData);
    const token = user.generateJwtToken();

    return res.status(200).json({ token, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export { signin, signup };
