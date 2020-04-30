import React, {Component} from "react";
import invitesService from "../../services/InvitesService";
import invitesActions from "../../actions/InvitesActions";
import assignmentsService from "../../services/AssignmentsService";
import assignmentsActions from "../../actions/AssignmentsActions";
import eventsService from "../../services/EventsService";
import eventsActions from "../../actions/EventsActions";
import {connect} from "react-redux";


class EditEvent extends Component {


  state = {
    updatedEvent: {...this.props.event}
  }

  handleNewEventInput(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.updatedEvent[attribute] = newContent;
    this.setState(newState);
  }

  handleUpdateEvent(e) {
    e.preventDefault();
    this.props.updateEvent(this.props.event.id, this.state.updatedEvent);
    this.props.editEvent(this.state.updatedEvent);
  }

  render() {
    return (
        <div className="bg-white p-4">
         <div className="bg-light border p-4">
           <div className="row align-items-between justify-content-between mb-2">
             <div className="col-auto">
               <h3>Update Event</h3>
             </div>
             <div className="col-auto">
               <button
                   onClick={this.props.cancelEditEvent}
                   className="btn btn-sm btn-danger">
                 Cancel Editing
               </button>
             </div>
           </div>
          <form onSubmit={(e) => this.handleUpdateEvent(e)}>
            <h4 className="mt-3">What</h4>
            <div className="form-group">
              <label htmlFor="eventNameInput">Event Name</label>
              <input
                  id="eventNameInput"
                  onChange={(e) => this.handleNewEventInput('name', e.target.value)}
                  className={`form-control`}
                  placeholder='Example: "Smith Family Reunion"'
                  defaultValue={this.state.updatedEvent.name}
                  required/>
            </div>
            <div className="form-group">
              <label htmlFor="eventDescriptionInput">Event Description</label>
              <input
                  id="eventDescriptionInput"
                  onChange={(e) => this.handleNewEventInput('description',
                      e.target.value)}
                  className={`form-control`}
                  placeholder='Example: "Pool Party and BBQ with Games"'
                  defaultValue={this.state.updatedEvent.description}
              />
            </div>
            <h4 className="mt-3">When</h4>
            <div className="form-group">
              <div className="form-row">
                <div className="col">
                  <label htmlFor="eventDateInput">Date of Event</label>
                  <input
                      id="eventDateInput"
                      type="date"
                      min="2020-01-01"
                      max="2040-01-01"
                      defaultValue={this.state.updatedEvent.date}
                      onChange={(e) => this.handleNewEventInput('date',
                          e.target.value)}
                      className={`form-control`}
                      required/>
                </div>
                <div className="col">
                  <label htmlFor="eventStartTimeInput">Start Time of
                    Event</label>
                  <input
                      id="eventStartTimeInput"
                      type="time"
                      defaultValue={this.state.updatedEvent.startTime}
                      onChange={(e) => this.handleNewEventInput('startTime',
                          e.target.value)}
                      className={`form-control`}
                  />
                </div>
                <div className="col">
                  <label htmlFor="eventEndTimeInput">End Time of Event</label>
                  <input
                      id="eventEndTimeInput"
                      type="time"
                      defaultValue={this.state.updatedEvent.endTime}
                      onChange={(e) => this.handleNewEventInput('endTime',
                          e.target.value)}
                      className={`form-control`}
                  />
                </div>
              </div>
            </div>
            <h4 className="mt-3">Where</h4>
            <div className="form-group">
              <label htmlFor="locationName">Location Name</label>
              <input
                  id="locationName"
                  onChange={(e) => this.handleNewEventInput('locationName',
                      e.target.value)}
                  className={`form-control`}
                  defaultValue={this.state.updatedEvent.locationName}
                  placeholder={`Example: "Nana's House"`}
              />
            </div>
            <div className="form-group">
              <div className="form-row">
                <div className="col">
                  <label htmlFor="streetAddress1Input">Street Address</label>
                  <input
                      id="streetAddress1Input"
                      onChange={(e) => this.handleNewEventInput('locationStreet1',
                          e.target.value)}
                      defaultValue={this.state.updatedEvent.locationStreet1}
                      className={`form-control`}
                  />
                </div>
                <div className="col">
                  <label htmlFor="streetAddress2Input">Street Address 2</label>
                  <input
                      id="streetAddress2Input"
                      onChange={(e) => this.handleNewEventInput('locationStreet2',
                          e.target.value)}
                      className={`form-control`}
                      defaultValue={this.state.updatedEvent.locationStreet2}
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
                      onChange={(e) => this.handleNewEventInput('locationCity',
                          e.target.value)}
                      defaultValue={this.state.updatedEvent.locationCity}
                      className={`form-control`}
                  />
                </div>
                <div className="col">
                  <label htmlFor="stateInput">State</label>
                  <input
                      id="stateInput"
                      onChange={(e) => this.handleNewEventInput('locationState',
                          e.target.value)}
                      defaultValue={this.state.updatedEvent.locationState}
                      className={`form-control`}
                  />
                </div>
                <div className="col">
                  <label htmlFor="zipInput">Zip Code</label>
                  <input
                      id="zipInput"
                      onChange={(e) => this.handleNewEventInput('locationZip',
                          e.target.value)}
                      defaultValue={this.state.updatedEvent.locationZip}
                      className={`form-control`}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="locationNotes">Location Notes</label>
              <input
                  id="locationNotes"
                  onChange={(e) => this.handleNewEventInput('locationNotes',
                      e.target.value)}
                  className={`form-control`}
                  defaultValue={this.state.updatedEvent.locationNotes}
                  placeholder='Example: Enter through the gate in the side yard.'
              />
            </div>
            <div className="form-group mt-3">
              <button type="submit" className="btn btn-info">Update Event</button>
            </div>
          </form>
        </div>
        </div>
    );
  }
}

const stateToPropertyMapper = state => {
  return {};
};


const dispatchToPropertyMapper = dispatch => {
  return {
    updateEvent: (eventId, event) => { // TODO - Update in rsvp list
      eventsService.updateEvent(eventId, event).then(response => {
        dispatch(eventsActions.updateEvent(eventId, event));
      });
    }
  };
};


export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(EditEvent);
