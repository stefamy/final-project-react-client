import React, {Component} from "react";

export default class CreateInvite extends Component {


  state = {
    newInvite: {
      eventId: this.props.eventId,
      invitationDate: new Date(),
      response: 'Pending',
      firstName: '',
      lastName: '',
      eventDate: this.props.eventDate,
      email: ''
    }
  }

  handleNewInviteInput(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.newInvite[attribute] = newContent;
    this.setState(newState);
  }

  handleCreateInvite(e) {
    e.preventDefault();
    this.props.createInvite(this.state.newInvite.eventId, this.state.newInvite);
    this.setState({
      newInvite: {
        firstName: '',
        lastName: '',
        email: ''
      }
    })
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
    return (
        <div className="new-invite-form mt-5 mb-5">
          <h3>Create New Invite</h3>
          <form onSubmit={(e) => this.handleCreateInvite(e)}>
            <div className="form-group">
              <label htmlFor="inviteFirstNameInput">First Name</label>
              <input
                  id="inviteFirstNameInput"
                  onChange={(e) => this.handleNewInviteInput('firstName', e.target.value)}
                  className="form-control"
                  placeholder="First name of the invitee"
                  required/>
            </div>
            <div className="form-group">
              <label htmlFor="inviteLastNameInput">Last Name</label>
              <input
                  id="inviteLastNameInput"
                  onChange={(e) => this.handleNewInviteInput('lastName', e.target.value)}
                  className="form-control"
                  placeholder="Last name of the invitee"
                  required
              />
            </div>
            <div className="form-group">
              <label htmlFor="inviteEmailInput">Email Address</label>
              <input
                  id="inviteEmailInput"
                  onChange={(e) => this.handleNewInviteInput('email', e.target.value)}
                  className="form-control"
                  placeholder="Email address of the invitee"
                  required
              />
            </div>
            <div className="form-group mt-3">
              {!this.state.isSaving && <button type="submit" className="btn btn-info">Add Invite</button> }
              {this.state.showSuccess && <span className="text-success success-saved"> Added!</span> }
              {this.state.isSaving && <button type="submit" disabled className="btn btn-info">Update Response</button> }
            </div>
          </form>
        </div>
    );
  }
}

