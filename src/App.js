import React from "react";
import './App.css';
import HomeContainer from "./containers/HomeContainer";
import {combineReducers, createStore} from "redux";
import userReducer from "./reducers/UserReducer";
import eventsReducer from "./reducers/EventsReducer";
import {Provider} from "react-redux";
import HeaderContainer from "./containers/HeaderContainer";
import {BrowserRouter as Router, Route} from "react-router-dom";
// import SearchContainer from "./containers/SearchContainer";
// import SearchResultsComponent from "./components/SearchResultsComponent";
// import RecipeDetailsComponent from "./components/RecipeDetailsComponent";
import Register from "./components/users/Register";
import Profile from "./components/users/Profile";
import User from "./components/users/User";
import Login from "./components/users/Login";
import EventList from "./components/events/EventList";

export default class App extends React.Component {

  state = {};

  rootReducer = combineReducers({
    user: userReducer,
    events: eventsReducer
  });

  store = createStore(this.rootReducer);

  componentDidMount() {
  }

  render() {
    return (
        <Provider store={this.store}>
          <div className="container-fluid">
            <HeaderContainer/>
              <div className="container-content container pt-3 pb-3">
              <Router>
                <Route
                    path="/"
                    exact={true}
                    render={props => (
                        <HomeContainer
                            {...props}
                        />
                    )}
                />
                <Route
                    path="/register"
                    exact={true}
                    render={props => (
                        <Register
                            history={props.history}
                        />
                    )}
                />
                <Route
                    path="/events"
                    exact={true}
                    render={props => (
                        <EventList
                            history={props.history}
                        />
                    )}
                />
                <Route
                    path="/profile"
                    exact={true}
                    render={props => (
                        <Profile
                            history={props.history}
                        />
                    )}
                />
                <Route
                    path="/user/:username"
                    exact={true}
                    render={props => (
                        <User
                            history={props.history}
                            username={props.match.params.username}
                        />
                    )}
                />
                <Route
                    path="/login"
                    exact={true}
                    render={props => (
                        <Login
                            history={props.history}
                        />
                    )}
                />
              {/*<Route*/}
              {/*    path="/search"*/}
              {/*    exact={true}*/}
              {/*    render={props => (*/}
              {/*        <SearchContainer {...props} />*/}
              {/*    )}*/}
              {/*/>*/}
              {/*<Route*/}
              {/*    path="/results/:queryText"*/}
              {/*    exact={true}*/}
              {/*    render={props => (*/}
              {/*        <SearchResultsComponent*/}
              {/*            {...props}*/}
              {/*            queryText={props.match.params.queryText}*/}
              {/*        />*/}
              {/*    )}*/}
              {/*/>*/}
              {/*<Route*/}
              {/*    path="/recipe/:recipeId"*/}
              {/*    render={props => (*/}
              {/*        <RecipeDetailsComponent*/}
              {/*            {...props}*/}
              {/*            recipeId={props.match.params.recipeId}*/}
              {/*        />*/}
              {/*    )}*/}
              {/*/>*/}
            </Router>
              </div>
          </div>
        </Provider>
    )
  }

}
