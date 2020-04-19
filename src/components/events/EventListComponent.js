import React, { Component } from "react";
import EventListItemComponent from "./EventListItemComponent";
import eventsService from "../../services/EventsService";
import eventsActions from "../../actions/EventsActions";
import { connect } from "react-redux";

class EventListComponent extends Component {
  state = {
    newEvent: {
      name: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      foodType: '',
      groupType: '',
      specialOccasion: '',
      dressType: '',
      locationName: '',
      locationStreet1: '',
      locationStreet2: '',
      locationCity: '',
      locationState: '',
      locationZip: '',
      locationNotes: ''
    }
  };

  handleNewEventInput(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.newEvent[attribute] = newContent;
    this.setState(newState);
  }

  handleCreateEvent(e) {
    e.preventDefault();
    this.props.createEvent(this.props.user.id, this.state.newEvent);
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.findEventsForUser(this.props.user.id);
    }
  }

  componentDidUpdate(prevProps) {
    console.log('this.props', this.props);
    console.log('this.state', this.state);
    if (prevProps.user !== this.props.user) {
        this.props.findEventsForUser(this.props.user.id);
    }
  }

  render() {
    return (
        <>
          <h1>Your Events</h1>
          <div className="row">
            {this.props.events &&
            this.props.events.map((event, index) => (
                <EventListItemComponent
                    key={index}
                    event={event}
                    history={this.props.history}
                    userId={this.props.user.id}
                />
            ))}
          </div>

          <h3>Create New Event</h3>
          <form onSubmit={(e) => this.handleCreateEvent(e)}>
            <h3 className="mt-3">What</h3>
            <div className="form-group">
              <label htmlFor="eventNameInput">Event Name</label>
              <input
                  id="eventNameInput"
                  required="required"
                  onChange={(e) => this.handleNewEventInput('name', e.target.value)}
                  className={`form-control`}
                  placeholder='Example: "Smith Family Reunion"'
                  required/>
            </div>
            <div className="form-group">
              <label htmlFor="eventDescriptionInput">Event Description</label>
              <input
                  id="eventDescriptionInput"
                  onChange={(e) => this.handleNewEventInput('description', e.target.value)}
                  className={`form-control`}
                  placeholder='Example: "Pool Party and BBQ with Games"' />
            </div>
            <h3 className="mt-3">When</h3>
            <div className="form-group">
              <div className="form-row">
                <div className="col">
                  <label htmlFor="eventDateInput">Date of Event</label>
                  <input
                      id="eventDateInput"
                      type="date"
                      min="2020-01-01"
                      max="2040-01-01"
                      onChange={(e) => this.handleNewEventInput('date', e.target.value)}
                      className={`form-control`}
                      required />
                </div>
                <div className="col">
                  <label htmlFor="eventStartTimeInput">Start Time of Event</label>
                  <input
                      id="eventStartTimeInput"
                      type="time"
                      onChange={(e) => this.handleNewEventInput('startTime', e.target.value)}
                      className={`form-control`}
                      />
                </div>
                <div className="col">
                  <label htmlFor="eventEndTimeInput">End Time of Event</label>
                  <input
                      id="eventEndTimeInput"
                      type="time"
                      onChange={(e) => this.handleNewEventInput('endTime', e.target.value)}
                      className={`form-control`}
                      />
                </div>
              </div>
            </div>
            <h3 className="mt-3">Where</h3>
            <div className="form-group">
              <label htmlFor="locationName">Location Name</label>
              <input
                  id="locationName"
                  onChange={(e) => this.handleNewEventInput('locationName', e.target.value)}
                  className={`form-control`}
                  placeholder={`Example: "Nana's House"`}
              />
            </div>
            <div className="form-group">
              <div className="form-row">
                <div className="col">
                  <label htmlFor="streetAddress1Input">Street Address</label>
                  <input
                      id="streetAddress1Input"
                      onChange={(e) => this.handleNewEventInput('locationStreet1', e.target.value)}
                      className={`form-control`}
                  />
                </div>
                <div className="col">
                  <label htmlFor="streetAddress2Input">Street Address 2</label>
                  <input
                      id="streetAddress2Input"
                      onChange={(e) => this.handleNewEventInput('locationStreet2', e.target.value)}
                      className={`form-control`}
                      placeholder="Apt, suite, floor, etc."
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <div className="col">
                  <label htmlFor="cityInput">City</label>
                  <input
                      id="cityInput"
                      onChange={(e) => this.handleNewEventInput('locationCity', e.target.value)}
                      className={`form-control`}
                  />
                </div>
                <div className="col">
                  <label htmlFor="stateInput">State</label>
                  <input
                      id="stateInput"
                      onChange={(e) => this.handleNewEventInput('locationState', e.target.value)}
                      className={`form-control`}
                  />
                </div>
                <div className="col">
                  <label htmlFor="zipInput">Zip Code</label>
                  <input
                      id="zipInput"
                      onChange={(e) => this.handleNewEventInput('locationZip', e.target.value)}
                      className={`form-control`}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="locationNotes">Location Notes</label>
              <input
                  id="locationNotes"
                  onChange={(e) => this.handleNewEventInput('locationNotes', e.target.value)}
                  className={`form-control`}
                  placeholder='Example: Enter through the gate in the side yard.'
              />
            </div>
            <div className="form-group mt-3">
              <button type="submit" className={`btn btn-primary btn-block`}>Create Your Event!</button>
            </div>
          </form>

        </>
    );
  }
}

const stateToPropertyMapper = state => {
  return {
    user: state.user.user,
    events: state.events.events
  };
};

const dispatchToPropertyMapper = dispatch => {
  return {
    findEventsForUser: userId => {
      eventsService.findEventsForUser(userId).then(events => {
        dispatch(eventsActions.findAllEvents(events));
      });
    },
    createEvent: (userId, event) => {
      eventsService.createEvent(userId, event).then(events => {
        dispatch(eventsActions.createEvent(event));
      });
    },
  };
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(EventListComponent);
