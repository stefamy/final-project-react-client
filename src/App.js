import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import HomeContainer from "./containers/HomeContainer";
import {combineReducers, createStore} from "redux";
import userReducer from "./reducers/UserReducer";
import eventsReducer from "./reducers/EventsReducer";
import assignmentsReducer from "./reducers/AssignmentsReducer";
import invitesReducer from "./reducers/InvitesReducer";
import HeaderContainer from "./containers/HeaderContainer";
import SearchContainer from "./containers/SearchContainer";
import SearchResultsComponent from "./components/SearchResultsComponent";
import RecipeDetailsComponent from "./components/RecipeDetailsComponent";
import Register from "./components/users/Register";
import Profile from "./components/users/Profile";
import User from "./components/users/User";
import Login from "./components/users/Login";
import AssignmentList from "./components/assignments/AssignmentList";
import InviteList from "./components/invites/InviteList";
import EventList from "./components/events/EventList";
import Event from "./components/events/Event";

class App extends React.Component {

  state = {};

  rootReducer = combineReducers({
    user: userReducer,
    events: eventsReducer,
    assignments: assignmentsReducer,
    invites: invitesReducer
  });

  store = createStore(this.rootReducer);

  componentDidMount() {
  }

  render() {
    return (
        <Provider store={this.store}>
          <div className="container-all bg-pattern">
            <HeaderContainer />
              <div className="container-content container pt-5 pb-5">
              <Router>
                <Route
                    path="/"
                    exact={true}
                    render={props => (
                        <HomeContainer
                            {...props}
                            history={props.history}
                        />
                    )}
                />
                <Route
                    path="/register"
                    exact={true}
                    render={props => (
                        <Register
                            {...props}
                            history={props.history}
                        />
                    )}
                />
                <Route
                    path="/events"
                    exact={true}
                    render={props => (
                        <EventList
                            {...props}
                            history={props.history}
                        />
                    )}
                />
                <Route
                    path="/events/:eventId"
                    exact={true}
                    render={props => (
                        <Event
                            {...props}
                            eventId={props.match.params.eventId}
                            history={props.history}
                        />
                    )}
                />
                <Route
                    path="/invites"
                    exact={true}
                    render={props => (
                        <InviteList
                            {...props}
                            findByUser={true}
                            history={props.history}
                        />
                    )}
                />
                <Route
                    path="/assignments"
                    exact={true}
                    render={props => (
                        <AssignmentList
                            {...props}
                            findByUser={true}
                            history={props.history}
                        />
                    )}
                />
                <Route
                    path="/profile"
                    exact={true}
                    render={props => (
                        <Profile
                            {...props}
                            history={props.history}
                        />
                    )}
                />
                <Route
                    path="/profile/:username"
                    exact={true}
                    render={props => (
                        <User
                            {...props}
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
                            {...props}
                            history={props.history}
                        />
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
                  render={props => (
                      <RecipeDetailsComponent
                          {...props}
                          recipeId={props.match.params.recipeId}
                      />
                  )}
              />
            </Router>
              </div>
          </div>
        </Provider>
    )
  }

}

export default App;
