import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import Address from "../structural/Address";
import {longDate} from "../../util/calendar";
import {time12Hour} from "../../util/clock"
import EditEvent from "./EditEvent";
import eventsActions from "../../actions/EventsActions";
import eventsService from "../../services/EventsService";
import InviteList from "../invites/InviteList";
import userActions from "../../actions/UserActions";
import TaskList from "../tasks/TaskList";
import {push} from "connected-react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";

class Event extends React.Component {

  state = {
    isEventHost: false,
    isEventGuest: false
  }

  componentDidMount() {
    this.props.loadAllEventData(this.props.match.params.eventId);
    if (this.props.user.profile.id && this.props.event) {
      this.setUserStatus();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.user.profile.id !== prevProps.user.profile.id
      || this.props.event.id !== prevProps.event.id) {
        this.setUserStatus();
      }
  }

  setUserStatus() {
      this.setState({
        isEventHost: this.props.event.hostId === this.props.user.id,
        isEventGuest: this.props.user.rsvps && (this.props.user.rsvps.some(rsvp => rsvp.event.id === this.props.event.id))
      });
  }

  handleResponseChange(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.event[attribute] = newContent;
    this.setState(newState);
  }

  handleCreateTask(eventId, task) {
    this.stopShowCreateTask();
    this.props.createTask(eventId, task);
  }

  showUpdateSuccess() {
    this.setState({
      isUpdating: false,
      showSuccess: true
    });
    return setTimeout(() => {
      this.setState({showSuccess: false})
    }, 1000);
  }

  doShowCreateTask() {
    this.setState({
      showCreateTask: true
    })
  }

  stopShowCreateTask() {
    this.setState({
      showCreateTask: false
    })
  }

  doShowEditEvent() {
      this.setState({
        isEditing: true
      })
  }


  stopShowEditEvent() {
    this.setState({
      isEditing: false
    })
  }

  render() {
    return (
        <div className="border bg-white rounded">

            {this.props.event && <>
            <div className="pt-4 pb-4 pl-3 pr-3 bg-light border-bottom rounded-top text-center position-relative">
              {this.state.isEventHost &&
                <div className="edit-btn-absolute">
                  {!this.state.isEditing &&
                  <button className="mr-2 btn" type="submit"
                          onClick={() => this.doShowEditEvent()}>
                    <FontAwesomeIcon icon={faPencilAlt} className="text-warning"/></button>
                  }
                  {this.state.isEditing &&
                  <button className="mr-2 btn border-warning"
                          type="submit"
                          onClick={() => this.stopShowEditEvent()}>
                    <FontAwesomeIcon icon={faPencilAlt} className="text-warning"/></button>
                  }
                </div>
                }
              <h3 className="display-4 pt-2">{this.props.event.name} </h3>
              <p className="lead">{this.props.event.description} </p>

              {this.state.isEventHost && <>
                <p>{longDate(this.props.event.date)}
                  {this.props.event.startTime &&
                    <span> • {time12Hour(this.props.event.startTime)}
                      {this.props.event.endTime && <span> - {time12Hour(this.props.event.endTime)}</span>}
                    </span>
                  }

                </p>

                <Address
                    name={this.props.event.locationName}
                    street1={this.props.event.locationStreet1}
                    street2={this.props.event.locationStreet2}
                    city={this.props.event.locationCity}
                    state={this.props.event.locationState}
                    zip={this.props.event.locationZip}
                    notes={this.props.event.locationNotes} />

                <p>Hosted by: <Link className="text-info" to={`/profile/${this.props.event.hostUsername}`}>{this.props.event.hostFirstName} {this.props.event.hostLastName}</Link></p>
              </>}
              {!this.state.isEventGuest && <p className="text-center">Only event guests can see event details.</p> }

            </div>
            {this.state.isEventHost && this.state.isEditing &&
            <EditEvent
                event={this.props.event}
                editEvent={() => this.editEvent()}
                cancelEditEvent={() => this.stopShowEditEvent()}
                deleteEvent={() => this.props.deleteEvent(this.props.user, this.props.event.id)}
            /> }

            <div className="pl-3 pr-3 pt-4 pb-4 event-info-inner">
              {this.state.isEventGuest && <InviteList event={this.props.event} isEventHost={this.state.isEventHost}/> }

              {this.state.isEventGuest && <TaskList event={this.props.event}/>}

              {!this.state.isEventGuest && <div>
                <h2>Guest List</h2>
                <p>Only event guests can see the invite list.</p>
                <h2>Task Assignments</h2>
                <p>Only event guests can see the task list.</p>
                <h2>Sign in</h2>
                <p>If you were invited to this event, please log in to see the full event details.</p>
                <a href="/login" className="btn btn-outline-info mr-2">Log in</a>
                <a href="/register" className="btn btn-outline-info">Register</a>
              </div>}

             </div>
            </>
            }

              {/*    /!*{this.state.guestUser && (!this.props.event.hostId === this.props.user.id) &&*!/*/}
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
    event: state.events.event
  };
};


const dispatchToPropertyMapper = dispatch => {
  return {
    loadAllEventData: (eventId) => {
      eventsService.findEventByEventId(eventId).then(event => {
        dispatch(eventsActions.findEvent(event));
      })
    },
    deleteEvent: (user, eventId) => {
      eventsService.deleteEvent(eventId).then(response => {
        dispatch(userActions.deleteCurrentUserHostedEvent(user, eventId));
        dispatch(push('/events'));
      })
    }
  };
};


export default connect(
    stateToPropertyMapper,
  dispatchToPropertyMapper
)(Event);

