import express from "express";
// import {verifyToken} from "../routes/URouter.js"
import { RecipeModel } from "../Models/Recipe.js";
import { userModel } from "../Models/users.js";

const recipeRouter = express.Router();

recipeRouter.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});
recipeRouter.post("/", async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

recipeRouter.put("/save", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeId);
    const user = await userModel.findById(req.body.userId);
    user.savedRecipes.push(recipe);
    await user.save();

    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

recipeRouter.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
   const user = await userModel.findById(req.params.userId)
   res.json({savedRecipes: user?.savedRecipes})

  } catch (err) {
    res.json(err);
  }
});

recipeRouter.get("/savedRecipes/:userId", async (req, res) => {
  try {
const user = await userModel.findById(req.params.userId)
const savedRecipes = await RecipeModel.find({
  _id: {$in: user.savedRecipes}
})
res.json({savedRecipes})

  } catch (err) {
    res.json(err);
  }
});



export { recipeRouter };
