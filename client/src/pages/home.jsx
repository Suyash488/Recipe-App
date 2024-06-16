import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId.jsx";
// import { useCookies } from "react-cookie";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  // const [cookies] = useCookies(["access_token"]);
  const userId = useGetUserId();

  const fetchRecipe = async () => {
    try {
      // console.log("Fetching recipes...");
      const response = await axios.get("http://localhost:3001/recipe");
      setRecipes(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchSavedRecipe = async () => {
    try {
      // console.log("Fetching saved ");
      const response = await axios.get(
        `http://localhost:3001/recipe/savedRecipes/ids/${userId}`
      );
      setSavedRecipes(response.data.savedRecipes);
      // console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecipe();
    fetchSavedRecipe();
  }, []);

  const saveRecipe = async (recipeId) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipe/save",
        {
          recipeId,
          userId,
        },
        // { headers: { authorization: cookies.access_token } }
      );
      console.log(response);
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <h1>RECIPES</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imgUrl} alt={recipe.name} />
            <p>cooking Time: {recipe.cookTime} (minutes)</p>
          </li>
        ))}
      </ul>
      {/* {console.log(recipes._id)} */}
    </div>
  );
};
