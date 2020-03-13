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
          <h4 className="recipe-title">{recipeData.title} </h4>
          <div className="recipe-time">Ready in: {recipeData.readyInMinutes} minutes </div>
          <div className="recipe-servings">Yields: {recipeData.servings} servings </div>
        </div>

      </Link>
      </div>
    </li>
);

export default RecipeResult;
