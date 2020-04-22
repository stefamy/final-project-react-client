import {Link} from "react-router-dom";
import React from "react";


const RecipePreview = ({ recipeData }) => (
      <div className="col-4 pb-3">
        <div className="card recipe-card">
          <div className="card-body">
            <h4 className="recipe-title">{recipeData.title} </h4>
            <div className="recipe-time">Ready in: {recipeData.readyInMinutes} minutes </div>
            <div className="recipe-servings">Yields: {recipeData.servings} servings </div>
            <Link to={`/recipe/${recipeData.id}`} title="Click for the recipe" className="mt-2 btn btn-info">
              Get the recipe
            </Link>
          </div>
        </div>
      </div>
);

export default RecipePreview;
