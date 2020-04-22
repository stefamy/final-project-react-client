import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import eventsService from "../services/EventsService";
import eventsActions from "../actions/EventsActions";
import userService from "../services/UserService";
import userActions from "../actions/UserActions";
import invitesService from "../services/InvitesService";
import invitesActions from "../actions/InvitesActions";
import assignmentsService from "../services/AssignmentsService";
import assignmentsActions from "../actions/AssignmentsActions";
import EventPreview from "../components/events/EventPreview";
import SearchBarComponent from "../components/SearchBarComponent";


class HomeContainer extends React.Component {

  componentDidMount() {
     this.props.findAllUserData();
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.events.length !== this.props.events.length) {
      this.setState({nextEvent: this.getNextUpcomingEvent()})
    }
  }

  getNextUpcomingEvent() {
    return this.props.events.find(event => new Date(event.date) >= new Date());
  }

  render() {
    return (
        <>
          {!this.props.user.id &&
          <div>
            <div className="mb-5 p-5 bg-white hero-unit rounded border">
              <h1>Welcome to the Potluck Party Planner! <span aria-label="jsx-a11y/accessible-emoji" role="img">🥳</span></h1>
              <h4>pot·​luck | ˈpät-ˈlək | <span className="subtitle"><em>noun</em></span></h4>
              <p>A meal or party to which each of the guests contributes a dish.</p>
            </div>
            <div className="row pb-5">
              <div className="col-lg-6 col-12 pb-5">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Let's Get Started!</h5>
                    <p className="card-text">Log in or register as a new user.</p>
                    <Link to="/login" className="btn btn-outline-info mr-2">Log in</Link>
                    <Link to="/register" className="btn btn-outline-info">Register</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12 pb-5">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Unsure what to bring to your
                      next party?</h5>
                    <p className="card-titlcol-md-6e">Search through our
                      database of 1000s of recipes.</p>
                    <SearchBarComponent
                        history={this.props.history}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          }

            {this.props.user.id &&
            <div>
              <div className="mb-5 p-5 bg-white hero-unit rounded border">
                <h1>Welcome to the Party Planner App <span aria-label="jsx-a11y/accessible-emoji" role="img">🥳</span></h1>
                <p>Organizing and delegating tasks for your next group event so
                  that you don't have to!</p>
              </div>
              <div className="row">
                <div className="col-lg-6 col-12 pb-5">
                  {this.state && this.state.nextEvent && <>
                    <EventPreview
                        headerText="Next Upcoming Event: "
                        event={this.state.nextEvent}
                        history={this.props.history}
                        userId={this.props.user.id}
                    />
                  </>}
                  {((!this.state) || (!this.state.nextEvent)
                      || (!this.state.nextEvent.id)) &&
                  <div className="card">
                    <h5 className="card-header">No upcoming events.</h5>
                    <div className="card-body">
                      <h5 className="card-title">Create an Event</h5>
                      <p className="card-text">With supporting text below as a
                        natural lead-in to additional content.</p>
                      <Link to="/events" className="btn btn-outline-info">Go to
                        events</Link>
                    </div>
                  </div>}
                </div>
                <div className="col-lg-6 col-12 pb-5">
                  <div className="card">
                    <h5 className="card-header">Receive an invite?</h5>
                    <div className="card-body">
                      <h5 className="card-title">RSVP to an Event</h5>
                      <p className="card-text">View all of your invites and
                        upate your responses.</p>
                      <Link to="/invites" className="btn btn-outline-info">Go to
                        invites</Link>
                    </div>
                  </div>
                </div>
                  <div className="col-12">
                    <div className="card">
                      <h5 className="card-header">Unsure what to bring to your
                        next party?</h5>
                      <div className="card-body">
                        <h5 className="card-titlcol-md-6e">Search through our
                          database of 1000s of recipes.</h5>
                        <SearchBarComponent
                            history={this.props.history}/>
                      </div>
                    </div>
                  </div>
              </div>

            </div>

            }
        </>
    );
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
    findHostEventsForUser: userId => {
      eventsService.findHostEventsForUser(userId).then(events => {
        dispatch(eventsActions.findAllEvents(events));
      });
    },
    findAllUserData: () => {
      userService.findUser().then(user => {
        if (user && user.id) {
          dispatch(userActions.findUser(user));
          eventsService.findHostEventsForUser(user.id)
          .then(events => dispatch(eventsActions.findAllEvents(events)));
          invitesService.findInvitesByGuestId(user.id)
          .then(invites => dispatch(invitesActions.findAllInvites(invites)));
          assignmentsService.findAssignmentByAssigneeUserId(user.id)
          .then(assignments => dispatch(
              assignmentsActions.findAllAssignments(assignments)));
        }
      });
    },
  };
};

  export default connect(
      stateToPropertyMapper,
      dispatchToPropertyMapper
  )(HomeContainer);
