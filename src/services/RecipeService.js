import {X_RAPIDAPI_HOST, X_RAPIDAPI_KEY, X_RAPIDAPI_URL} from '../common/ApiConstants';

export const findRecipesByQueryTerm = (queryTerm) =>
  fetch(X_RAPIDAPI_URL + "recipes/search?query=" + queryTerm, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": X_RAPIDAPI_HOST,
      "x-rapidapi-key": X_RAPIDAPI_KEY
    }
  })
  .then(response => {
    return(response.json());
  })
  .catch(err => {
    console.log(err);
  });




export const retrieveRecipe = (recipeId) =>
  fetch(
      X_RAPIDAPI_URL + "recipes/" + recipeId + "/information",
      {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": X_RAPIDAPI_HOST,
          "x-rapidapi-key": X_RAPIDAPI_KEY
        }
      })
  .then(response => response.json()) // Getting the actual response data
  .catch(err =>  console.log(err) );



export default {
  findRecipesByQueryTerm,
  retrieveRecipe
}
