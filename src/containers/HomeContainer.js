import {BrowserRouter as Router, Route} from "react-router-dom";
import SearchResultsComponent from "../components/SearchResultsComponent";
import RecipeDetailsComponent from '../components/RecipeDetailsComponent';
import RecipeFinderContainer from "./RecipeFinderContainer";
import React from "react";
import SearchContainer from "./SearchContainer";

import Register from "../components/users/Register";
import Profile from "../components/users/Profile";
import Login from "../components/users/Login";

/**
 * @param {{queryText:string}} queryText
 * @param {{recipeId:string}} recipeId
 */
export default class HomeContainer extends React.Component {


  render() {
    return (
        <div className="container-fluid">
          <header>
            <h1 className="site-title">Potluck Party Organizer</h1>
          </header>
          <Router>
            <Route
                path="/"
                exact={true}
                render={props => (
                    <RecipeFinderContainer {...props} />
                )}
            />
            <Route
                path="/search"
                exact={true}
                render={props => (
                    <SearchContainer {...props} />
                )}
            />
            <Route
                path="/results/:queryText"
                exact={true}
                render={props => (
                    <SearchResultsComponent
                        {...props}
                        queryText={props.match.params.queryText}
                    />
                )}
            />
            <Route
                path="/recipe/:recipeId"
                // exact={true}
                render={props => (
                    <RecipeDetailsComponent
                        {...props}
                        recipeId={props.match.params.recipeId}
                    />
                )}
            />
            <Route
                path="/register"
                exact={true}
                component={Register}
            />
            <Route
                path="/profile"
                exact={true}
                component={Profile}
            />
            <Route
                path="/login"
                exact={true}
                component={Login}
            />
          </Router>
        </div>
    );
  }

}

