import React, { Component } from "react";
import EventPreview from "./EventPreview";
import CreateEvent from "./CreateEvent";
import eventsService from "../../services/EventsService";
import eventsActions from "../../actions/EventsActions";
import { connect } from "react-redux";

class EventList extends Component {

  componentDidMount() {
    if (this.props.user.id) {
      this.props.findEventsForUser(this.props.user.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
        this.props.findEventsForUser(this.props.user.id);
    }
  }

  render() {
    return (
        <> 
        <h1 className="pt-3 pb-5">Events</h1>
        {!this.props.user &&
          <>
          <p>You're not currently logged in.</p>
          <CreateEvent />
        </>
        }
        
        {this.props.user &&
          <>
            <div className="row">
            <div className="col-4">
              <h3>Upcoming Events</h3>
                {this.props.events &&
                this.props.events.map((event, index) => (
                    <EventPreview
                        key={index}
                        event={event}
                        history={this.props.history}
                        userId={this.props.user.id}
                      />
                ))}
            </div>
            <div className="col-8">
              <CreateEvent
                createEvent={this.props.createEvent}
                user={this.props.user}
                />
            </div>
            </div>
          </>
          }
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
)(EventList);
