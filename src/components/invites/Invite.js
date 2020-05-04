import React from "react";
import {Link} from "react-router-dom";
import EditInvite from "./EditInvite";
import {faPencilAlt, faTimes, faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ModalConfirm from "../structural/ModalConfirm";


function badgeClass(response) {
  switch (response) {
    case "Yes":
      return 'bg-green border border-green';
    case "No":
      return 'bg-light border text-muted ';
    default:
      return 'bg-yellow border border-yellow ';
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

  confirmDeleteEvent(e) {
    e.preventDefault();
    this.setState({showConfirm: true});
  }

  stopShowConfirm() {
    this.setState({showConfirm: false});
  }


  render() {
    const invite = this.props.invite;

    return ( <>
        <div className="list-group-item">
          <div className="row justify-content-between align-items-start align-items-md-center">
            <div className="col-12 col-md pl-0">
              {invite.guest.accountClaimed === 1 &&
              <Link className="text-info" to={`/profile/`
              + invite.guest.username}>{invite.guest.firstName} {invite.guest.lastName}</Link>
              }
              {invite.guest.accountClaimed !== 1 && <>
                {invite.firstName} {invite.lastName}
              </>}
              <span className={`ml-3 badge badge-pill mr-2 ` + badgeClass(
                  invite.response)}>{invite.response}</span>
              {this.props.event.hostId === invite.guestId && <span className="badge badge-white">Event Host ⭐️</span>}
              {invite.comments &&
              <div className="small text-muted pt-2 pb-1 pt-md-0 pb-md-0">Comment from guest: {invite.firstName}: {invite.comments}</div>
              }
            </div>
            {this.props.isEventHost &&
              <div className="col-12 col-md-auto pl-0">
                <a href={`mailto:` + invite.email}
                   className="mr-1 btn text-info">
                  <FontAwesomeIcon icon={faEnvelope} className="text-info"/></a>
                {!this.state.isEditing &&
                  <button className="mr-1 btn" type="submit"
                  onClick={() => this.doShowEditInvite()}>
                  <FontAwesomeIcon icon={faPencilAlt} className="text-warning"/></button>
                }
                {this.state.isEditing &&
                  <button className="btn border-warning" type="submit"
                  onClick={() => this.stopShowEditInvite()}>
                    <FontAwesomeIcon icon={faPencilAlt} className="text-warning"/></button>
                }
                  <button className="btn" type="submit"
                  onClick={(e) => this.confirmDeleteEvent(e)}>
                    <FontAwesomeIcon icon={faTimes} className="text-danger"/></button>
                </div>
              }
          </div>

        </div>

        {this.state.isEditing &&
          <EditInvite
              invite={invite}
              updateInvite={this.props.updateInvite}
              cancelEditInvite={() => this.stopShowEditInvite()}
          />
          }
        <ModalConfirm
            show={this.state.showConfirm}
            headerText="Delete this invite?"
            bodyText="Are you sure you want to delete this invite? This action cannot be undone."
            yesText="Delete Invite"
            noText="Cancel"
            yesBtnClass="btn btn-danger"
            noBtnClass="btn btn-secondary"
            handleClose={() => this.stopShowConfirm()}
            yesFunction={() => this.props.deleteInvite(invite.id)}
        />
    </>);
  }
}

export default Invite;
