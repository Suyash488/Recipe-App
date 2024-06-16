import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  imgUrl: { type: String, required: true },
  cookTime: { type: Number, required: true },
  userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
});

export const RecipeModel = mongoose.model("recipe", RecipeSchema);
