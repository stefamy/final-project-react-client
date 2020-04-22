import React from "react";
import RecipeResult from "./RecipeResult";


export default class SearchResultsComponent extends React.Component {

  state = {
    results: '',
    count: 0,
  };

  constructor(props) {
    super(props);

  }

  sendQuery() {
    const query = this.props.queryText;
    fetch(
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query="
        + query,
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
        results: data.results,
        count: data.totalResults
      });
      return data;
    })
    .catch(err => {
      console.log(err);
    });

  }

  componentDidMount() {
    this.sendQuery();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.queryText !== this.props.queryText) {
        this.sendQuery();
      }
    }

    render() {
      return (
          <>
          <div className="pt-3 pb-3 mb-4 bg-white border rounded d-flex align-items-center justify-content-between">
            <div className="col">
              <h4>Search term: {this.props.queryText}</h4>
              <p className="mb-0">Viewing 10 results.</p>
            </div>
            <div className="col-auto">
              <button type="button" className="float-right btn btn-info"
                      onClick={this.props.history.goBack}>Back
              </button>
            </div>
          </div>
            <div className="row">
            {this.state.results &&
              this.state.results.map((each, index) => (
                  <RecipeResult
                      key={index}
                      recipeData={each}
                  />
              ))}
          </div>
            {!this.state.results &&
            <p>Searching...</p>}
      </>
    );
  }
}
