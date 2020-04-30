import React from "react";
import RecipePreview from "../components/recipes/RecipePreview";
import {findRecipesByQueryTerm} from "../services/RecipeService";

export default class SearchResults extends React.Component {

  state = {
    results: '',
    count: 0,
  };

  sendQuery() {
    findRecipesByQueryTerm(this.props.queryTerm).then(data => {
      if (data) {
        this.setState({
          results: data.results,
          count: data.totalResults
        });
      } else {
        this.setState({
          results: "",
          count: 0
        });
      }

    });
  }

  componentDidMount() {
    this.sendQuery();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.queryTerm !== this.props.queryTerm) {
        this.sendQuery();
      }
    }

    render() {
      return (
          <>
          <div className="pt-3 pb-3 mb-4 bg-white border rounded d-flex align-items-center justify-content-between">
            <div className="col">
              <h4>Search term: {this.props.queryTerm}</h4>
              {this.state.results && <p className="mb-0">Viewing {this.state.count} results.</p>}
            </div>
          </div>
            <div className="row">
            {this.state.results &&
              this.state.results.map((each, index) => (
                  <RecipePreview
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
