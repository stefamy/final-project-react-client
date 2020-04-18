import {BrowserRouter as Router, Route} from "react-router-dom";
import SearchResultsComponent from "../components/SearchResultsComponent";
import HeaderContainer from "./HeaderContainer";
import RecipeDetailsComponent from '../components/RecipeDetailsComponent';
import RecipeFinderContainer from "./RecipeFinderContainer";
import React from "react";
import SearchContainer from "./SearchContainer";
import userReducer from "../reducers/UserReducer";

import Register from "../components/users/Register";
import Profile from "../components/users/ProfileComponent";
import Login from "../components/users/Login";

import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

/**
 * @param {{queryText:string}} queryText
 * @param {{recipeId:string}} recipeId
 */
export default class HomeContainer extends React.Component {

  state = {};

  rootReducer = combineReducers({
    user: userReducer
  });

  store = createStore(this.rootReducer);

  componentDidMount() {
    console.log('this.state:', this.state);
  }
  render() {
    return (
        <Provider store={this.store}>
          <div className="container-fluid">
            <HeaderContainer />
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
        </Provider>
    );
  }

}
