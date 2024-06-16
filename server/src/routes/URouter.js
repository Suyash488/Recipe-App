import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../Models/users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });
    if (user) {
      return res.json({ message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "new user successfully registered", newUser });
  } catch (err) {
    res.status(500).json(err);
  }

  // res.json(user)
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.json({ message: "username doesn't exist! " });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.json({ message: "username or password is incorrect" });
    }
    const token = jwt.sign({ id: user._id }, "sec");
    res.json({ token, userId: user._id });
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as userRouter };

// export const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (token) {
//     jwt.verify(token, "sec"),
//       (err) => {
//         if (err) return res.sendStatus(403);
//         next();
//       };
//   } else {
//     res.sendStatus(401);
//   }
// };
