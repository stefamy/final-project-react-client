import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import Address from "../structural/Address";
import {longDate} from "../../util/calendar";
import eventsService from "../../services/EventsService";
import InviteList from "../invites/InviteList";
import InviteRsvp from "../invites/InviteRsvp";
import invitesActions from "../../actions/InvitesActions";
import invitesService from "../../services/InvitesService";
import EventAssignmentList from "../assignments/AssignmentList";
import assignmentsActions from "../../actions/AssignmentsActions";
import assignmentsService from "../../services/AssignmentsService";

class Event extends React.Component {

  state = {
    event: {},
    isEventHost: false,
    isEventGuest: false
  }

  componentDidMount() {
    eventsService.findEventByEventId(this.props.match.params.eventId).then((event) => {
      this.setState({event: event})
      this.props.loadAllEventData(event.id);
    });
    if (this.props.user.profile.id && this.state.event) {
      this.setUserStatus();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.user.profile.id !== prevProps.user.profile.id
        || this.state.event.id !== prevState.event.id) {
      this.setUserStatus();
    }
  }

  setUserStatus() {
      this.setState({
        isEventHost: this.state.event.hostId === this.props.user.profile.id,
        isEventGuest: this.props.user.rsvps && (this.props.user.rsvps.some(rsvp => rsvp.event.id === this.state.event.id))
      });
  }

  handleResponseChange(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.event[attribute] = newContent;
    this.setState(newState);
  }

  handleCreateAssignment(eventId, assignment) {
    this.stopShowCreateAssignment();
    this.props.createAssignment(eventId, assignment);
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log('2 this props', this.props);

    // if (this.props.user && (prevProps.eventInvites !== this.props.eventInvites)) {
    //   const invite = this.props.eventInvites.find(invite => invite.guestId === this.props.user.id);
    //   this.setState({
    //     userInvite: invite,
    //     guestUser: !(invite && invite.id)
    //   });
    // }
    // if (prevProps.eventAssignments && (this.props.eventAssignments.length !== prevProps.eventAssignments.length)) {
    //   this.stopShowCreateAssignment();
    // }
    // if (prevProps.eventInvites && (this.props.eventInvites.length !== prevProps.eventInvites.length)) {
    //   this.stopShowCreateInvite();
    // }

  // }

  showUpdateSuccess() {
    this.setState({
      isUpdating: false,
      showSuccess: true
    });
    return setTimeout(() => {
      this.setState({showSuccess: false})
    }, 1000);
  }

  handleUpdateEvent(e) {
    e.preventDefault();
    this.setState({ isUpdating: true});
    eventsService.updateEvent(this.state.event.id, this.state.event)
    .then(success => this.showUpdateSuccess());
  }

  doShowCreateAssignment() {
    this.setState({
      showCreateAssignment: true
    })
  }

  stopShowCreateAssignment() {
    this.setState({
      showCreateAssignment: false
    })
  }

  getUserInvite(userId) {
    return this.props.eventInvites.find(invite => invite.guestId === userId);
  }


  render() {
    return (
        <div className="bg-white border">

            {this.state.event && <>
            <div className="bg-light p-3 border-bottom text-center">
              <h3 className="display-4 pt-2">{this.state.event.name} </h3>
              <p className="lead">{this.state.event.description} </p>
              <p>{longDate(this.state.event.date)} {this.state.event.startTime && <span> • {this.state.event.startTime}</span>} </p>

              <Address
                  name={this.state.event.locationName}
                  street1={this.state.event.locationStreet1}
                  street2={this.state.event.locationStreet2}
                  city={this.state.event.locationCity}
                  state={this.state.event.locationState}
                  zip={this.state.event.locationZip}
                  notes={this.state.event.locationNotes} />

              <p>Hosted by: <Link to={`/profile/${this.state.event.hostUsername}`}>{this.state.event.hostFirstName} {this.state.event.hostLastName}</Link></p>
            </div>

            {this.state.isEventHost &&
            <div className="col-12 bg-white p-3">
              <InviteList event={this.state.event} />
            </div> }

            <div className="col-12 bg-white p-3">
            <EventAssignmentList event={this.state.event} />
            </div>

            {this.state.isEventGuest &&
              <div className="col-12 bg-white p-3">
                <h3>Your RSVP</h3>
                <InviteRsvp
                    event={this.state.event}
                    rsvp={this.props.user.rsvps.find(rsvp => rsvp.invite.eventId === this.state.event.id)}
                    hideEventDetails={true}

                />
              </div>
            }

            </>
            }

              {/*    /!*{this.state.guestUser && (!this.state.event.hostId === this.props.user.id) &&*!/*/}
              {/*    /!*<p>For privacy reasons, only event guests can see the invite list. <br/>*!/*/}
              {/*    /!*  If you are on the invite list, please sign in to view the full event details.</p>}*!/*/}


              {/*<hr/>*/}


          </div>

    );


    }

}

const stateToPropertyMapper = state => {
  return {
    user: state.user.user,
    eventAssignments: state.assignments.eventAssignments,
    eventInvites: state.invites.eventInvites
  };
};


const dispatchToPropertyMapper = dispatch => {
  return {
    loadAllEventData: (eventId) => {
      invitesService.findAllInvitesForEvent(eventId).then(invites => {
        dispatch(invitesActions.findAllInvitesForEvent(invites));
      });
      assignmentsService.findAllAssignmentsForEvent(eventId).then(assignments => {
        dispatch(assignmentsActions.findAllAssignmentsForEvent(assignments));
      });
    },
  };
};


export default connect(
    stateToPropertyMapper,
  dispatchToPropertyMapper
)(Event);

