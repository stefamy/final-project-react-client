import {BrowserRouter as Router, Route} from "react-router-dom";
import SearchResultsComponent from "../components/SearchResultsComponent";
import SearchContainer from "./SearchContainer";

import React from "react";


export default class RecipeFinderContainer extends React.Component {

  render() {
    return (
        <div>
          <h1>Recipe Search API</h1>

          <Router>
            <Route
                path="/"
                exact={true}
                render={props => (
                    <SearchContainer
                        {...props}
                    />
                )}
            />
            <Route
                path="/queryResults/:queryText"
                exact={true}
                render={props => (
                    <SearchResultsComponent
                        {...props}
                        queryText={props.match.params.queryText}
                    />
                )}
            />
          </Router>
        </div>
    );
    }

  }

