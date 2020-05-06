import React, {Component} from "react";

export default class EditInvite extends Component {


  state = {
    updatedInvite: {...this.props.invite}
  }

  handleNewInviteInput(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.updatedInvite[attribute] = newContent;
    this.setState(newState);
  }

  handleUpdateInvite(e) {
    e.preventDefault();
    console.log('this state', this.state);
    this.props.updateInvite(this.state.updatedInvite.inviteId, this.state.updatedInvite);
    this.props.cancelEditInvite();
  }

  updateResponseChoice(e) {
    this.handleNewInviteInput('response', e.target.value);
  }

  showSaveSuccess() {
    this.setState({
      isSaving: false,
      showSuccess: true
    });
    return setTimeout(() => {
      this.setState({showSuccess: false})
    }, 1000);
  }


  render() {
    const invite = this.props.invite;

    return (
        <div className="edit-invite-form p-md-4 p-3 bg-light border-left border-right">
          <div className="row align-items-between justify-content-between mb-2">
            <div className="col-auto">
              <h5>Update Invite</h5>
            </div>
            <div className="col-auto">
              <button
                  onClick={this.props.cancelEditInvite}
                  className="btn btn-sm border-pink bg-pink">
                Cancel
              </button>
            </div>
          </div>
          <form>
            {invite.accountClaimed === 0 && <>
            <div className="form-group">
              <label htmlFor="inviteFirstNameInput">First Name</label>
              <input
                  id="inviteFirstNameInput"
                  onChange={(e) => this.handleNewInviteInput('firstName', e.target.value)}
                  className="form-control"
                  placeholder="First name of the invitee"
                  defaultValue={invite.firstName}
                  required/>
            </div>
            <div className="form-group">
              <label htmlFor="inviteLastNameInput">Last Name</label>
              <input
                  id="inviteLastNameInput"
                  onChange={(e) => this.handleNewInviteInput('lastName', e.target.value)}
                  className="form-control"
                  placeholder="Last name of the invitee"
                  defaultValue={invite.lastName}
                  required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inviteEmailInput">Email Address*</label>
              <input
                  id="inviteEmailInput"
                  onChange={(e) => this.handleNewInviteInput('email', e.target.value)}
                  className="form-control"
                  placeholder="Email address of the invitee"
                  defaultValue={invite.email}
                  disabled
              />
              <small id="emailHelp" className="form-text text-muted">
                *Invites are tied to the email address of the guest. If you entered in the wrong email address, delete the invite and make another one with the correct information.
              </small>
            </div>  </>}

            <div className="form-group mt-2 mb-4" onChange={this.updateResponseChoice.bind(this)}>
            <div className="form-check form-check-inline pr-3">
              <label className="form-check-label"
                     htmlFor={`response1 + ${invite.inviteId}`}>
                <input className="form-check-input"
                       id={`response1 + ${invite.inviteId}`}
                       type="radio"
                       name={`response + ${invite.inviteId}`}
                       value="Yes"
                       defaultChecked={invite.response
                       === "Yes"}
                />Attending</label>
            </div>
            <div className="form-check form-check-inline pr-3">
              <label className="form-check-label"
                     htmlFor={`response2 + ${invite.inviteId}`}>
                <input className="form-check-input"
                       id={`response2 + ${invite.inviteId}`}
                       type="radio"
                       name={`response + ${invite.inviteId}`}
                       value="No"
                       defaultChecked={invite.response
                       === "No"}
                />Not Attending</label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label"
                     htmlFor={`response3 + ${invite.inviteId}`}>
                <input className="form-check-input"
                       id={`response3 + ${invite.inviteId}`}
                       type="radio"
                       name={`response + ${invite.inviteId}`}
                       value="Pending"
                       defaultChecked={invite.response
                       === "Pending"}
                />No Response Yet</label>
            </div>
        </div>
            <div className="form-group mt-3 mb-0">
              {!this.state.isSaving && <button type="submit" className="btn btn-info" onClick={(e) => this.handleUpdateInvite(e)}>Update Invite</button> }
              {this.state.showSuccess && <span className="text-success success-saved">Saved!</span> }
              {this.state.isSaving && <button type="submit" disabled className="btn btn-info">Update Invite</button> }
            </div>
          </form>
        </div>
    );
  }
}

