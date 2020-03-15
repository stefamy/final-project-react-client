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
    console.log('querying...', query);
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
    console.log('mounted!', this)
    this.sendQuery();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps !== this.props) {
        console.log('updated, reran query');
        this.sendQuery();
      }
    console.log('updated, nothing changed.');
  }

    render() {
      return (
          <div>
            <h4>Search term: {this.props.queryText}</h4>
          <div>
            <button type="button" className="float-right btn btn-primary"
                    onClick={this.props.history.goBack}>Back
            </button>
          <p>Viewing 10 of {this.state.count} results.</p>
            <ul className="grid">
            {this.state.results &&
              this.state.results.map((each, index) => (
                  <RecipeResult
                      key={index}
                      recipeData={each}
                  />
              ))}
          </ul>
          </div>
            {!this.state.results &&
            <p>Searching...</p>}
        </div>
    );
  }
}
