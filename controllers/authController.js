import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name,email,password,phone,address} = req.body;
    //validations
    if (!name) {
      {
        return res.send({ message: "Name is required" });
      }
    }
    if (!email) {
      {
        return res.send({ message: "Email is required" });
      }
    }
    if (!password) {
      {
        return res.send({ message: "Password is required" });
      }
    }
    if (!phone) {
      {
        return res.send({ message: "Phone no. is required" });
      }
    }
    if (!address) {
      {
        return res.send({ message: "Address is required" });
      }
    }


  

    //check user
    const existingUser = await userModel.findOne({ email });
    //check existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    //register user--jo password aa rha h usko hash kr rhe h
    const hashedPassword = await hashPassword(password);
    //save password
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Registration",
      error
    });
  }
};

//POST- LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user h ki nai
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    //comparing and decrypting of password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //create token
    const token = await JWT.sign({ _id:user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
