import React from "react";
import userService from "../services/UserService";
import userActions from "../actions/UserActions";
import {connect} from "react-redux";
import eventsService from "../services/EventsService";
import eventsActions from "../actions/EventsActions";
import invitesService from "../services/InvitesService";
import invitesActions from "../actions/InvitesActions";
import assignmentsService from "../services/AssignmentsService";
import assignmentsActions from "../actions/AssignmentsActions";


/**
 */
class HeaderContainer extends React.Component {

  componentDidMount() {
    if (this.props.user.id) {
      this.props.findAllUserData();
    } else {
      this.props.findUser();
    }
    console.log('this.props', this.props);
    console.log('this.state', this.state);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      if (this.props.user.id) {
        this.props.findAllUserData();
      }
    }
  }

  render() {
    return (
        <header className="bg-white  border-bottom">
              <nav className="container navbar navbar-expand-lg navbar-default justify-content-between">
                    <div className="navbar-header">
                      <a className="navbar-brand" href="/">Potluck Party Planner</a>
                    </div>
                {this.props.user.username &&
                    <ul className="nav navbar-nav">
                      <li><a href="/profile" className="nav-link btn">Your Profile</a></li>
                      <li><button onClick={this.props.logout} className="nav-link btn">Logout</button></li>
                    </ul>
                }
                {!this.props.user.username &&
                  <ul className="nav navbar-nav">
                    <li><a href="/login" className="nav-link btn">Log in</a></li>
                    <li><a href="/register" className="nav-link btn" >Register</a></li>
                  </ul>
                  }
              </nav>
        </header>
    );
  }

}

const stateToPropertyMapper = state => {
  return {
    user: state.user.user,
    events: state.events.events,
    invites: state.invites.invites,
    assignments: state.assignments.assignments
  };
};

const dispatchToPropertyMapper = dispatch => {
  return {
    findUser: () => {
      userService.findUser()
      .then(user => dispatch(userActions.findUser(user)));
    },
    findAllUserData: () => {
      userService.findUser().then(user => {
        dispatch(userActions.findUser(user));
        eventsService.findEventsForUser(user.id)
        .then(events => dispatch(eventsActions.findAllEvents(events)));
        invitesService.findInvitesByGuestId(user.id)
        .then(invites => dispatch(invitesActions.findAllInvites(invites)));
        assignmentsService.findAssignmentByAssigneeUserId(user.id)
        .then(assignments => dispatch(assignmentsActions.findAllAssignments(assignments)));
      });
    },
    logout: () => {
      userService.logout()
      .then(() => dispatch(userActions.logout()));
    },
  };
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(HeaderContainer);
