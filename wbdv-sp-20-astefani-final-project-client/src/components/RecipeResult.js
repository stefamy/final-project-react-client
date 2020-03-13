import {Link} from "react-router-dom";
import React from "react";


const RecipeResult = ({ recipeData }) => (
    <li className="item">
      <div className="card recipe-card">
      <Link to={`/recipeDetails/${recipeData.id}`} title="Click for the recipe">

        <div className="card-bg-img" style={{ backgroundImage: `url('https://spoonacular.com/recipeImages/${recipeData.imageUrls[0]}')` }} >
          <img src={`https://spoonacular.com/recipeImages/${recipeData.imageUrls[0]}`} alt='' />
        </div>

        <div className="card-body">
          <span className="recipe-title">{recipeData.title} </span>
          <span className="recipe-time">Ready in: {recipeData.readyInMinutes} minutes </span>
          <span className="recipe-servings">Yields: {recipeData.servings} servings </span>
        </div>

      </Link>
      </div>
    </li>
);

export default RecipeResult;
