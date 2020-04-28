import React from "react";
import {Provider} from "react-redux";
import './App.css';
import AppContainer from "./AppContainer";
import {combineReducers, createStore} from "redux";
import userReducer from "./reducers/UserReducer";
import eventsReducer from "./reducers/EventsReducer";
import assignmentsReducer from "./reducers/AssignmentsReducer";
import invitesReducer from "./reducers/InvitesReducer";
import reviewsReducer from "./reducers/ReviewsReducer";

class App extends React.Component {

  state = {};

  rootReducer = combineReducers({
    user: userReducer,
    events: eventsReducer,
    assignments: assignmentsReducer,
    invites: invitesReducer,
    reviews: reviewsReducer
  });

  store = createStore(this.rootReducer);

  render() {
    return (
        <Provider store={this.store}>
          <AppContainer />
        </Provider>
    )
  }

}

export default App;
