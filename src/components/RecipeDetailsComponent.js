import {Link} from "react-router-dom";
import React from "react";
import RecipeCard from './RecipeCard';
import {EDAMAM_API_KEY, EDAMAM_APP_ID, SAMPLE_DETAILS} from "../common/constants";
import {Image} from "react-bootstrap";


export default class RecipeDetailsComponent extends React.Component {

  state = {
    recipeData: ''
  };

  constructor(props) {
    super(props);
  }

  retrieveRecipe() {
    const recipeId = this.props.recipeId;
    console.log('querying', recipeId);
    fetch(
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeId + "/information",
        {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "4cb3ca57e6msh641ab0b4d2376ecp1f48f6jsna9a5d36c8e28"
          }
        })
    .then(response => response.json()) // Getting the actual response data
    .then(data => {
      this.setState({
        recipeData: data
      });
      console.log('this', this)
      return data;
    })
    .catch(err => {
      console.log(err);
    });

  }

  componentDidMount() {
    this.retrieveRecipe();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      console.log('updated, reran query');
      this.retrieveRecipe();
    }
    console.log('updated, nothing changed.');
  }


  render() {
    const recipe = this.state.recipeData;
    return (
        <div>
          {recipe &&
          <div>
            <RecipeCard
                title={recipe.title}
                image={recipe.image}
                time={recipe.readyInMinutes}
                servings={recipe.servings}
                ingredients={recipe.extendedIngredients}
                instructions={recipe.analyzedInstructions}
                courses={recipe.dishTypes}
                />
            <a href={`${recipe.sourceUrl}`}><span className="recipe-source"> Source: {recipe.sourceName}</span></a>

          </div>
          }
        </div>
    );
  }

}
