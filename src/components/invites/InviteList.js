import React, {Component} from "react";
import inviteService from "../../services/InviteService";
import eventsActions from "../../actions/EventsActions";
import {connect} from "react-redux";
import userService from "../../services/UserService";
import userActions from "../../actions/UserActions";


class InviteList extends Component {

  state = {}

  componentDidMount() {
    if (this.props.user.id) {
      this.props.findInviteByGuestId(this.props.user.id);
    } else {
      this.props.findUser();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.id && (prevProps.user.id !== this.props.user.id)) {
      // this.props.findInvitesByGuestId(this.props.user.id).then(invites =>
      this.setState(
          {invites: this.props.findInvitesByGuestId(this.props.user.id)});
      // }
    }
  }

  render() {
    return (
        <>
          {this.state.invites &&
              <div>
            the invite is for event ID# {this.state.invites.id}
              </div>
          }
          {!this.state.invites &&
          <div>
            No invites yet...
          </div>
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
    findUser: () => {
      userService.findUser()
      .then(user => dispatch(userActions.findUser(user)));
    },
    findInvitesByGuestId: userId => inviteService.findInvitesByGuestId(userId)
      .then(invites => invites)
        // dispatch(eventsActions.findInviteByGuestId(invites));
      //});

    // createInvite: (eventId, invite) => {
    //   inviteService.createInvite(invite).then(invite => {
    //     dispatch(eventsActions.createInivte(invite));
    //   });
    // },
    // updateInvite: (inviteId, invite) => {
    //   inviteService.updateInvite(invite).then(invite => {
    //     dispatch(eventsActions.updateInvite(invite));
    //   });
    // }
  };

};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(InviteList);
