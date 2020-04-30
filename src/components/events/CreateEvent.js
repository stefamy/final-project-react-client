import React, {Component} from "react";


export default class CreateEvent extends Component {


  state = {
    newEvent: { }
  }

  handleNewEventInput(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.newEvent[attribute] = newContent;
    this.setState(newState);
  }

  handleCreateEvent(e) {
    e.preventDefault();
    this.props.createEvent(this.props.user, this.state.newEvent);
  }

  render() {
    return (
        <div className="mb-5">
          <h3>Create New Event</h3>
          <form onSubmit={(e) => this.handleCreateEvent(e)}>
            <h3 className="mt-3">What</h3>
            <div className="form-group">
              <label htmlFor="eventNameInput">Event Name</label>
              <input
                  id="eventNameInput"
                  onChange={(e) => this.handleNewEventInput('name', e.target.value)}
                  className={`form-control`}
                  placeholder='Example: "Smith Family Reunion"'
                  required/>
            </div>
            <div className="form-group">
              <label htmlFor="eventDescriptionInput">Event Description</label>
              <input
                  id="eventDescriptionInput"
                  onChange={(e) => this.handleNewEventInput('description',
                      e.target.value)}
                  className={`form-control`}
                  placeholder='Example: "Pool Party and BBQ with Games"'/>
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
                      onChange={(e) => this.handleNewEventInput('endTime',
                          e.target.value)}
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
                  onChange={(e) => this.handleNewEventInput('locationName',
                      e.target.value)}
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
                      onChange={(e) => this.handleNewEventInput('locationStreet1',
                          e.target.value)}
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
                      className={`form-control`}
                  />
                </div>
                <div className="col">
                  <label htmlFor="stateInput">State</label>
                  <input
                      id="stateInput"
                      onChange={(e) => this.handleNewEventInput('locationState',
                          e.target.value)}
                      className={`form-control`}
                  />
                </div>
                <div className="col">
                  <label htmlFor="zipInput">Zip Code</label>
                  <input
                      id="zipInput"
                      onChange={(e) => this.handleNewEventInput('locationZip',
                          e.target.value)}
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
                  placeholder='Example: Enter through the gate in the side yard.'
              />
            </div>
            <div className="form-group mt-3">
              <button type="submit" className="btn btn-info btn-lg btn-block">Create Your Event!</button>
            </div>
          </form>
        </div>
    );
  }
}

