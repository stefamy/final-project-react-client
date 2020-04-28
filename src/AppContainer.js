import React from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route} from "react-router-dom";
import userService from "./services/UserService";
import userActions from "./actions/UserActions";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HomeContainer from "./containers/HomeContainer";
import Register from "./components/users/Register";
import EventList from "./components/events/EventList";
import Event from "./components/events/Event";
import InviteList from "./components/invites/InviteList";
import AssignmentList from "./components/assignments/AssignmentList";
import Profile from "./components/users/EditUser";
import User from "./components/users/User";
import Login from "./components/users/Login";
import SearchContainer from "./containers/SearchContainer";
import SearchResultsComponent from "./search/SearchResultsComponent";
import RecipeDetailsComponent from "./components/recipes/RecipeDetails";


class AppContainer extends React.Component {

  componentDidMount() {
    this.props.findAllUserData();
  }

  render() {
    return (
        <Router>
          <div className="container-all bg-pattern">
            <Route
                path=""
                render={props => (
                    <Header
                        {...props}
                        history={props.history}
                    />
                )}
            />
            <div className="container mt-5 pb-5">
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
                  path="/profile/user/edit"
                  exact={true}
                  render={props => (
                      <Profile
                          {...props}
                          history={props.history}
                          isEditing={true}
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
            </div>
            <Route
                path=""
                render={props => (
                    <Footer
                        {...props}
                    />
                )}
            />
          </div>
        </Router>
      )
    }
}


const stateToPropertyMapper = state => {
  return {
    user: state.user.user,
    events: state.events.events,
    assignments: state.assignments.assignments,
    invites: state.invites.invites
  };
};


const dispatchToPropertyMapper = dispatch => {
  return {
    findAllUserData: () => {
      userService.findCurrentUserData().then(user => {
        if (user) {
          dispatch(userActions.findCurrentUserData(user));
        }
      });
    },
  };
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(AppContainer);
