import React from "react";

// import {EDAMAM_APP_ID, EDAMAM_API_KEY, SAMPLE_RESPONSE} from '../common/constants';


const RecipeResult = ({ recipeData }) => (
    <li>
      {console.log(recipeData)}
      <span className="recipe-title">{recipeData.recipe.label}</span>
      <span className="source-name">From {recipeData.recipe.source}</span>
      <a href={recipeData.recipe.url} target="_blank" rel="noopener noreferrer" title={recipeData.recipe.source}>Get the recipe</a>
    </li>
);

export default RecipeResult;
