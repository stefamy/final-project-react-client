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

/**
 * @param {{queryText:string}} queryText
 * @param {{recipeId:string}} recipeId
 */
class HomeContainer extends React.Component {

  componentDidMount() {
    if (this.props.user) {
      this.props.findAllUserData();
    }
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.events.length !== this.props.events.length) {
      this.setState({nextEvent: this.getNextUpcomingEvent()})
    }
    console.log(this.state);
    console.log('this.props', this.props);
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
              <h1>Welcome to the Potluck Party Planner!</h1>
              <h4>pot·​luck | ˈpät-ˈlək | <span className="subtitle"><em>noun</em></span></h4>
              <p>A meal or party to which each of the guests contributes a dish.</p>
              <p><Link to="/about" className="btn btn-primary btn-large">Learn more</Link></p>
            </div>
            <div className="row pb-5">
              <div className="col-lg-6 col-12 pb-5">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Let's Get Started!</h5>
                    <p className="card-text">Log in or register as a new user.</p>
                    <Link to="/login" className="btn btn-primary mr-2">Log in</Link>
                    <Link to="/register" className="btn btn-primary">Register</Link>

                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12 pb-5">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Recent Recipe Review</h5>
                    <p className="card-text">Check out the recipe.</p>
                    <Link to="/" className="btn btn-primary mr-2">Get the recipe</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
          {this.props.user.id &&
            <div>
              <div className="mb-5 p-5 bg-white hero-unit rounded border">
                  <h1>Welcome to the Party Planner App!</h1>
                  <p>Tagline</p>
                  <p><Link to="/" className="btn btn-primary btn-large">Learn more</Link></p>
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
                    {((!this.state) || (!this.state.nextEvent) || (!this.state.nextEvent.id)) &&
                    <div className="card">
                      <h5 className="card-header">No upcoming events.</h5>
                        <div className="card-body">
                            <h5 className="card-title">Create an Event</h5>
                            <p className="card-text">With supporting text below as a
                              natural lead-in to additional content.</p>
                            <Link to="/events" className="btn btn-primary">Go to events</Link>
                          </div>
                    </div> }
                </div>
                <div className="col-lg-6 col-12 pb-5">
                <div className="card">
                  <h5 className="card-header">Receive an Invite?</h5>
                  <div className="card-body">
                    <h5 className="card-title">RSVP to an Event</h5>
                    <p className="card-text">With supporting text below as a
                      natural lead-in to additional content.</p>
                    <Link to="/invites" className="btn btn-primary">Go to invites</Link>
                  </div>
                </div>
                </div>
              </div>
              <div className="row pb-5">
                <div className="col">
                  <div className="card">
                    <h5 className="card-header">Featured</h5>
                    <div className="card-body">
                      <h5 className="card-title">Special title treatment</h5>
                      <p className="card-text">With supporting text below as a
                        natural lead-in to additional content.</p>
                      <Link to="/assignments" className="btn btn-primary">Go to assignments</Link>
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
    findEventsForUser: userId => {
      eventsService.findEventsForUser(userId).then(events => {
        dispatch(eventsActions.findAllEvents(events));
      });
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
  };
};

  export default connect(
      stateToPropertyMapper,
      dispatchToPropertyMapper
  )(HomeContainer);
