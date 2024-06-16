import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/URouter.js";
import { recipeRouter } from "./routes/recipeRoute.js";
import { DB_NAME } from "../constants.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipe", recipeRouter);

mongoose
  .connect(
    `mongodb+srv://thakursuyash488:ash488@recipes.vhwothy.mongodb.net/${DB_NAME}`
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.error(err));

app.listen(3001, () => console.log("`SERVER STARTED"));
