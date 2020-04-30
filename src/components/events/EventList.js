import React, { Component } from "react";
import EventPreview from "./EventPreview";
import CreateEvent from "./CreateEvent";
import eventsService from "../../services/EventsService";
import eventsActions from "../../actions/EventsActions";
import { connect } from "react-redux";

class EventList extends Component {

  state = {
    showCreateEvent: false
  }

  componentDidMount() {
    // if (this.props.user.profile) {
    //   this.props.findHostEventsForUser(this.props.user.profile.id);
    // }
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.user.profile !== this.props.user.profile) {
    //     this.props.findHostEventsForUser(this.props.user.profile.id);
    // }
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
    const user = this.props.user || null;

    return (
         <div className="bg-white border p-5">
          {!user.profile &&
              <>
               <h1 className="pb-2">Events You're Hosting</h1>
               <p> Please log in to view or create your events.</p>
             </>
          }

          {user.profile &&
          <>
            <div className="row justify-content-between align-items-start pb-3">
              <h1 className="col">Events You're Hosting</h1>
                {!this.state.showCreateEvent &&
                <div className="col-auto">
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
                  user={this.props.user}
              />
              }
            <div className="row">
              {user.hostedEvents &&
              user.hostedEvents.map((event, index) => (
                  <EventPreview
                      key={index}
                      event={event}
                      history={this.props.history}
                      canDelete={true}
                      handleDeleteEvent={() => this.props.deleteEvent(event.id)}
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
    user: state.user.user,
    events: state.events.events
  };
};

const dispatchToPropertyMapper = dispatch => {
  return {
    // findHostEventsForUser: userId => {
    //   eventsService.findHostEventsForUser(userId).then(events => {
    //     dispatch(eventsActions.findAllEvents(events));
    //   });
    // },
    createEvent: (userId, event) => {
      eventsService.createEvent(userId, event).then(event => {
        dispatch(eventsActions.createEvent(event));
      });
    },
    deleteEvent: (eventId) => {
      eventsService.deleteEvent(eventId).then(res => {
        dispatch(eventsActions.deleteEvent(eventId));
      });
    },
  };
  
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(EventList);
