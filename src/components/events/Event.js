import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Address from "../structural/Address";
import {longDate} from "../../util/calendar";
import {time12Hour} from "../../util/clock"
import EditEvent from "./EditEvent";
import eventsActions from "../../actions/EventActions";
import eventsService from "../../services/EventService";
import InviteList from "../invites/InviteList";
import userActions from "../../actions/UserActions";
import TaskList from "../tasks/TaskList";
import {push} from "connected-react-router";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";

class Event extends React.Component {

  state = {
    isEventHost: false,
    isEventGuest: false
  }

  componentDidMount() {
    this.props.loadAllEventData(this.props.match.params.eventId);
    if (this.props.userId && this.props.event.id) {
      this.setUserStatus();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.userId !== prevProps.userId
      || this.props.event.id !== prevProps.event.id) {
        this.setUserStatus();
      }
  }

  setUserStatus() {
      this.setState({
        isEventHost: this.props.event.logistics.hostId === this.props.userId,
        isEventGuest: this.props.invites && (this.props.invites.some(invite => invite.event.id === this.props.event.id))
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

            {this.props.event.id && this.props.event.logistics && <>
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
              <h3 className="display-4 pt-2">{this.props.event.logistics.name} </h3>
              <p className="lead">{this.props.event.logistics.description} </p>

              {this.state.isEventGuest && <>
                <p>{longDate(this.props.event.logistics.date)}
                  {this.props.event.logistics.startTime &&
                    <span> • {time12Hour(this.props.event.logistics.startTime)}
                      {this.props.event.logistics.endTime && <span> - {time12Hour(this.props.event.logistics.endTime)}</span>}
                    </span>
                  }

                </p>

                <Address
                    name={this.props.event.logistics.locationName}
                    street1={this.props.event.logistics.locationStreet1}
                    street2={this.props.event.logistics.locationStreet2}
                    city={this.props.event.logistics.locationCity}
                    state={this.props.event.logistics.locationState}
                    zip={this.props.event.logistics.locationZip}
                    notes={this.props.event.logistics.locationNotes} />

                <p>Hosted by: <Link className="text-info" to={`/profile/${this.props.event.logistics.hostUsername}`}>{this.props.event.logistics.hostFirstName} {this.props.event.logistics.hostLastName}</Link></p>
              </>}
              {!this.state.isEventGuest && <p className="text-center">Only event guests can see event details.</p> }

            </div>
            {this.state.isEventHost && this.state.isEditing &&
            <EditEvent
                logistics={this.props.event.logistics}
                editEvent={() => this.editEvent()}
                cancelEditEvent={() => this.stopShowEditEvent()}
                deleteEvent={() => this.props.deleteEvent(this.props.user, this.props.event.id)}
            /> }

            <div className="pl-3 pr-3 pt-4 pb-4 event-info-inner">
              {this.state.isEventGuest && <InviteList eventId={this.props.event.id} isEventHost={this.state.isEventHost}/> }

              {this.state.isEventGuest && <TaskList eventId={this.props.event.id}/>}

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
    userId: state.user.userId,
    profile: state.user.profile,
    events: state.user.events,
    tasks: state.user.tasks,
    invites: state.user.invites,
    event: {
      id: state.event.id,
      logistics: state.event.logistics,
      guestList: state.event.guestList,
    },

  };
};


const dispatchToPropertyMapper = dispatch => {
  return {
    loadAllEventData: (eventId) => {
      eventsService.findEventDataStore(eventId).then(eventData => {
        dispatch(eventsActions.findEventData(eventData));
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

