import React, { Component } from "react";
import EventPreview from "./EventPreview";
import CreateEvent from "./CreateEvent";
import eventsService from "../../services/EventService";
import userActions from "../../actions/UserActions";
import { connect } from "react-redux";

class EventList extends Component {

  state = {
    showCreateEvent: false
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
  }

  doShowCreateEvent() {
    this.setState({
      showCreateEvent: true
    })
  }

  stopShowCreateEvent() {
    this.setState({
      showCreateEvent: false
    })
  }

  render() {

    return (
         <div className="bg-white border p-md-4 p-3">
          {!this.props.userId &&
              <>
               <h1 className="pb-2">Events You're Hosting</h1>
               <p> Please log in to view or create your events.</p>
             </>
          }

          {this.props.userId &&
          <>
            <div className="row justify-content-between align-items-start pb-3">
              <h1 className="col">Events You're Hosting</h1>
                {!this.state.showCreateEvent &&
                <div className="col-md-auto">
                  <button
                      onClick={() => this.doShowCreateEvent()}
                      className="btn btn-info">
                    Add New Event
                  </button>
                </div>
                }
              {this.state.showCreateEvent &&
              <div className="col-auto">
                <button onClick={() => this.stopShowCreateEvent()} className="btn btn-danger"> Cancel Creating New Event </button>
              </div>
              }
            </div>
              {this.state.showCreateEvent &&
              <CreateEvent
                  createEvent={this.props.createEvent}
                  userId={this.props.userId}
              />
              }
            <div className="row">
              {this.props.events &&
              this.props.events.map((event, index) => (
                  <EventPreview
                      key={index}
                      event={event}
                      history={this.props.history}
                      canDelete={true}
                      deleteEvent={() => this.props.deleteEvent(event.id)}
                      outerWrapClass="col-lg-4 col-md-6 col-12 pb-3"
                  />
              ))}
            </div>
          </>
          }

      </div>
    );
  }
}

const stateToPropertyMapper = state => {
  return {
    userId: state.user.userId,
    profile: state.user.profile,
    events: state.user.events
  };
};

const dispatchToPropertyMapper = dispatch => {
  return {
    createEvent: (userId, event) => {
      eventsService.createEvent(userId, event).then(event => {
        dispatch(userActions.createCurrentUserHostedEvent(event));
      });
    },
    deleteEvent: (eventId) => {
      eventsService.deleteEvent(eventId).then(res => {
        dispatch(userActions.deleteCurrentUserHostedEvent(eventId));
      });
    },
  };
  
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(EventList);
