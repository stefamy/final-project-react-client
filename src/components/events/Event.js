import React from "react";
import eventsActions from "../../actions/EventsActions";
import eventsService from "../../services/EventsService";
import { connect } from "react-redux";

class Event extends React.Component {

  state = {
    invites: [
      {
        user: '4',
        firstName: 'Dave',
        response: 'yes',
        dateSent: '10/01',
        dateReceived: '11/02'
      },
      {
        user: '3',
        firstName: 'Amy',
        response: 'no',
        dateSent: '10/01',
        dateReceived: '11/02'
      }
    ]
  }
  
  componentDidMount() {
    this.props.findInviteList(this.props.event.id);
  }

  render() {
    return(
          <>
            <ul class="list-group">
              <li class="list-group-item">
                  <h5 className="card-title">{this.props.event.name}</h5>
                  <h6 className="card-subtitle">{this.props.event.description}</h6>
              </li>
            </ul>
          </>
      );
    }

}


const stateToPropertyMapper = state => {
  return {
    event: state.event.event
  };
};

const dispatchToPropertyMapper = dispatch => {
  return {
    findInviteList: (eventId) => {
      eventsService.findInviteList(eventId)
      .then(invites => dispatch(eventsActions.findInviteList(invites)));
    },
    // logout: () => {
    //   eventsService.logout()
    //   .then(() => dispatch(eventsActions.logout()));
    // },
    // updateUser: (user) => {
    //   eventsService.updateUser(user)
    //   .then(user => {
    //     dispatch(eventsActions.updateUser(user));
    //   });
    // },
  };
};

export default connect(
  stateToPropertyMapper,
  dispatchToPropertyMapper
)(Event);
