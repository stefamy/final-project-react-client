import React from "react";
import invitesService from "../../services/InvitesService";
import {connect} from "react-redux";
import invitesActions from "../../actions/InvitesActions";
import userActions from "../../actions/UserActions";
import _ from 'lodash';

 class InviteRsvp extends React.Component {

   state = {
    invite: {...this.props.rsvp.invite}
   }

   componentDidMount() {
     this.setState({
       rsvpIndex: _.findIndex(this.props.user.rsvps, {invite: this.state.invite})
   });
   }


   handleResponseChange(attribute, newContent) {
     let newState = Object.assign({}, this.state);
     newState.invite[attribute] = newContent;
     this.setState(newState);
   }

   updateResponseChoice(e) {
     this.handleResponseChange('response', e.target.value);
   }

   showUpdateSuccess() {
      this.setState({
        showSuccess: true,
        isUpdating: false,
      });
      return setTimeout(() => {
         this.setState({showSuccess: false})
       }, 1000);
  }

   handleUpdateInvite(e) {
     e.preventDefault();
     this.setState({isUpdating: true})
     this.props.updateInviteRsvp(this.state.invite, this.props.user, this.state.rsvpIndex);
     this.showUpdateSuccess();
   }

   render() {
     const invite = this.props.rsvp ? this.props.rsvp.invite : null;
   
     return (
           <div className="invite-rsvp mb-3">
             {this.props.event &&
               <div className="invite-response-form mt-3 mb-3">
                   <div className="form-group" onChange={this.updateResponseChoice.bind(this)}>
                     <div className="form-check form-check-inline pr-3">
                       <label className="form-check-label"
                              htmlFor={`response1 + ${invite.id}`}>
                         <input className="form-check-input"
                                id={`response1 + ${invite.id}`}
                                type="radio"
                                name={`response + ${invite.id}`}
                                value="Yes"
                                defaultChecked={invite.response
                                === "Yes"}
                         />I'll be there!</label>
                     </div>
                     <div className="form-check form-check-inline pr-3">
                       <label className="form-check-label"
                              htmlFor={`response2 + ${invite.id}`}>
                         <input className="form-check-input"
                                id={`response2 + ${invite.id}`}
                                type="radio"
                                name={`response + ${invite.id}`}
                                value="No"
                                defaultChecked={invite.response
                                === "No"}
                         />Can't make it</label>
                     </div>
                     <div className="form-check form-check-inline">
                       <label className="form-check-label"
                              htmlFor={`response3 + ${invite.id}`}>
                         <input className="form-check-input"
                                id={`response3 + ${invite.id}`}
                                type="radio"
                                name={`response + ${invite.id}`}
                                value="Pending"
                                defaultChecked={invite.response
                                === "Pending"}
                         />No response yet</label>
                     </div>
                   </div>

               <div className="invite-response-body">
                 <input type="text"
                        className="form-control"
                        placeholder="Comments for host"
                        defaultValue={invite.comments || ''}
                        onChange={(e) => this.handleResponseChange('comments', e.target.value)}
                 />

                 <div className="mt-3">
                   {(this.state.invite.response !== this.props.rsvp.invite.response
                   || this.state.invite.comments !== this.props.rsvp.invite.comments) &&
                      <button
                          type="submit"
                          onClick={(e) => this.handleUpdateInvite(e)}
                          className="btn btn-info">Update Response
                      </button>}
                   {!this.state.showSuccess && this.state.isUpdating && <button
                       type="submit" disabled
                       className="btn btn-success">Update Response</button>}
                   {this.state.showSuccess && <button
                       type="submit" disabled
                       className="btn btn-success">Updated!</button>}
                 </div>

               </div>

               </div>
             }

           </div>
     );

   }

}

const stateToPropertyMapper = state => {
  return {
    user: state.user.user,
    eventInvites: state.invites.eventInvites
  };
};


const dispatchToPropertyMapper = dispatch => {
  return {
    updateInviteRsvp: (invite, user, rsvpIndex) => {
      invitesService.updateInvite(invite.id, invite).then(response => {
        dispatch(invitesActions.updateInviteForEvent(invite));
        dispatch(userActions.updateCurrentUserRsvp(user, invite, rsvpIndex));
      });
    },
  }
}

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(InviteRsvp);
