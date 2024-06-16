import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId.jsx";

export const SaveRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userId = useGetUserId();


  const fetchSavedRecipe = async () => {
    try {
      // console.log("Fetching saved ");
      const response = await axios.get(
        `http://localhost:3001/recipe/savedRecipes/${userId}`
      );
      setSavedRecipes(response.data.savedRecipes);
      // console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    fetchSavedRecipe();
  }, []);

  

 
  return (
    <div>
      <h1>SAVED RECIPES</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>


            <div>
              <h2>{recipe.name}</h2>
              
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
