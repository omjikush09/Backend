import { Request, Response } from "express";
import prisma from "../utils/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.keys";
import errorFunction from "./../utils/error";

//Hash Password
const hashPassward = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassward = await bcrypt.hash(password, salt);
  return hashedPassward;
};

//Create JWT
const generateJWT = async (id: string) => {
  return jwt.sign(
    {
      id,
    },
    JWT_SECRET,
    { expiresIn: "10h" }
  );
};

export const createUser = async (req: Request, res: Response) => {
  const user: User = req.body;

  try {
    const userData = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (userData) {
      return errorFunction(res, "User Already Exist", 400);
    }
    try {
      user.password = await hashPassward(user.password);
      //Call to Database
      const createdUser = await prisma.user.create({ data: user });
      const jwt_token = await generateJWT(createdUser.id);

      return res.status(200).json({
        status: 200,
        message: "Success",
        jwt_token,
      });
    } catch (error) {
      return errorFunction(res, "Something went wrong...", 502);
    }
  } catch (error) {
    return res.status(502).json({
      status: false,
      error: "Something went wrong...",
    });
  }
};

//Login User
export const loginUser = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const userData = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (userData) {
      const validPassword = await bcrypt.compare(
        user.password,
        userData.password
      );
      if (validPassword) {
        const jwt_token = await generateJWT(userData.id);
        return res.json({
          status: 200,
          message: "Success",
          jwt_token,
        });
      } else {
        return errorFunction(res, "User and Password Deos not match", 400);
      }
    } else {
      return errorFunction(res, "User deos not exist", 400);
    }
  } catch (error) {
    return errorFunction(res, "Something went wrong", 502);
  }
};

interface User {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  age: number;
  city: string;
}
