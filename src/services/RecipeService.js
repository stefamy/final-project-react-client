import {X_RAPIDAPI_HOST, X_RAPIDAPI_KEY, X_RAPIDAPI_URL} from '../common/ApiConstants';

export const findRecipesByQueryTerm = async (queryTerm) =>  {

  fetch(X_RAPIDAPI_URL + "recipes/search?query=" + queryTerm, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": X_RAPIDAPI_HOST,
      "x-rapidapi-key": X_RAPIDAPI_KEY
    }
  })
  .then(response => {
    return(response);
  })
  .catch(err => {
    console.log(err);
  });

}
