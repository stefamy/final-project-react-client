import React from "react";
import {Link} from "react-router-dom";
import EditInvite from "./EditInvite";


function badgeClass(response) {
  switch (response) {
    case "Yes":
      return 'badge-success';
    case "No":
      return 'badge-secondary';
    case "Pending":
      return 'badge-info';
    case "Maybe":
      return 'badge-warning';
    default:
      return 'badge-warning';
  }
}

class Invite extends React.Component {

  state = {
    isEditing: false
  }

  doShowEditInvite() {
    this.setState({
      isEditing: true
    });
  }

  stopShowEditInvite() {
    this.setState({
      isEditing: false
    });
  }

  render() {
    const invite = this.props.invite;

    return ( <>
        <div className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            {invite.guest.accountClaimed === 1 &&
            <Link className="text-info" to={`/profile/`
            + invite.guest.username}>{invite.guest.firstName} {invite.guest.lastName}</Link>
            }
            {invite.guest.accountClaimed !== 1 && <>
              {invite.firstName} {invite.lastName}
            </>}
            <span className={`ml-3 badge badge-pill ` + badgeClass(
                invite.response)}>{invite.response}</span>
          </div>
          <div>
            <a href={`mailto:` + invite.email}
               className="mr-2 btn text-info"><i
                className="fa fa-envelope text-info"></i></a>
            {!this.state.isEditing &&
            <button className="mr-2 btn" type="submit"
                    onClick={() => this.doShowEditInvite()}>
              <i className="text-warning fa fa-pencil"></i></button>
            }
            {this.state.isEditing &&
            <button className="mr-2 btn border-warning" type="submit"
                    onClick={() => this.stopShowEditInvite()}>
              <i className="text-warning fa fa-pencil"></i></button>
            }
            <button className="btn" type="submit"
                    onClick={() => this.props.deleteInvite(invite.id)}><i
                className="text-danger fa fa-close"></i></button>
          </div>
        </div>
        {this.state.isEditing &&
          <EditInvite
              invite={invite}
              updateInvite={this.props.updateInvite}
              cancelEditInvite={() => this.stopShowEditInvite()}
          />
          }
    </>);
  }
}

export default Invite;
