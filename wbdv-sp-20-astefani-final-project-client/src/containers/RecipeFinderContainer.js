import {BrowserRouter as Router, Route} from "react-router-dom";
import SearchResultsComponent from "../components/SearchResultsComponent";
import RecipeDetailsComponent from '../components/RecipeDetailsComponent';
import SearchContainer from "./SearchContainer";
import React from "react";


/**
 * @param {{queryText:string}} queryText
 * @param {{recipeId:string}} recipeId
 */
export default class RecipeFinderContainer extends React.Component {


  render() {
    return (
        <div className="container-fluid">
          <header>
          <h1>Recipe Search API</h1>
          </header>
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
            <Route
                path="/recipeDetails/:recipeId"
                // exact={true}
                render={props => (
                    <RecipeDetailsComponent
                        {...props}
                        recipeId={props.match.params.recipeId}
                    />
                )}
            />
          </Router>
        </div>
    );
    }

  }

