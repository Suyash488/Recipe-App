import { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId.jsx";
import { useNavigate } from "react-router-dom";

export const CreateRecipe = () => {
  const userId = useGetUserId();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imgUrl: "",
    cookTime: 0,
    userOwner: userId,
  });

  const Navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredients = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipe", recipe);
      alert("RECIPE CREATED!");
      Navigate('/')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredients, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredients}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button onClick={addIngredients} type="button">
          Add Ingredients
        </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          name="instructions"
          id="instructions"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imgUrl">Img Url</label>
        <input type="text" id="imgUrl" name="imgUrl" onChange={handleChange} />
        <label htmlFor="cookTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookTime"
          name="cookTime"
          onChange={handleChange}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
