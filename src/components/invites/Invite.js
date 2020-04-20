import React from "react";
import eventsService from "../../services/EventsService";
import EventPreview from "../events/EventPreview";
import invitesService from "../../services/InvitesService";
import invitesActions from "../../actions/InvitesActions";
import {connect} from "react-redux";

 class Invite extends React.Component {

   state = { }

   componentDidMount() {
     this.setState({
       invite: {...this.props.invite}
     });
     if (!this.props.event) {
         eventsService.findEventById(this.props.invite.eventId)
         .then((event) => this.setState({event: event}));
        } else {
         this.setState({event: this.props.event});
       }
   }

   handleResponseChange(attribute, newContent) {
     let newState = Object.assign({}, this.state);
     newState.invite[attribute] = newContent;
     this.setState(newState);
   }

   componentDidUpdate(prevProps) {
     console.log('updated!');
   }

   updateResponseChoice(e) {
     this.handleResponseChange('response', e.target.value);
   }

   showUpdateSuccess() {
      this.setState({
        isUpdating: false,
        showSuccess: true
      });
      return setTimeout(() => {
         this.setState({showSuccess: false})
       }, 1000);
  }

   handleUpdateInvite(e) {
     e.preventDefault();
     this.setState({ isUpdating: true});
     invitesService.updateInvite(this.state.invite.id, this.state.invite)
     .then(success => this.showUpdateSuccess());
   }

   render() {
     return (
         <>
           <div className="col pb-4">
             {this.state.event &&
                 <>
                   <h3>Event: {this.state.event.name} </h3>
                   <h5>{this.state.event.description} </h5>
                   <p>{this.state.event.date} </p>
                   <form onSubmit={(e) => this.handleUpdateInvite(e)}>
                     <div className="form-group" onChange={this.updateResponseChoice.bind(this)}>
                       <div className="form-check form-check-inline">
                        <label className="form-check-label" htmlFor={`response1 + ${this.props.invite.id}`}>
                        <input className="form-check-input"
                               id={`response1 + ${this.props.invite.id}`}
                               type="radio"
                               name={`response + ${this.props.invite.id}`}
                               value="YES"
                               defaultChecked={this.props.invite.response === "YES"}
                        />
                       Yes</label>
                       </div>
                       <div className="form-check form-check-inline">
                        <label className="form-check-label" htmlFor={`response2 + ${this.props.invite.id}`}>
                        <input className="form-check-input"
                               id={`response2 + ${this.props.invite.id}`}
                               type="radio"
                               name={`response + ${this.props.invite.id}`}
                               value="NO"
                               defaultChecked={this.props.invite.response === "NO"}
                        />
                        No</label>
                       </div>
                       <div className="form-check form-check-inline">
                        <label className="form-check-label" htmlFor={`response3 + ${this.props.invite.id}`}>
                        <input className="form-check-input"
                               id={`response3 + ${this.props.invite.id}`}
                               type="radio"
                               name={`response + ${this.props.invite.id}`}
                               value="PENDING"
                               defaultChecked={this.props.invite.response === "PENDING"}
                        />
                        Pending</label>
                       </div>
                     </div>
                     <div className="form-group">
                       <input type="text"
                              className="form-control"
                              placeholder={'Comments for host'}
                              defaultValue={this.props.invite.comments || ''}
                              onChange={(e) => this.handleResponseChange('comments', e.target.value)}
                       />
                     </div>
                      {!this.state.isUpdating && <button type="submit" className={`btn btn-primary`}>Update Response</button> }
                      {this.state.showSuccess && <span className="text-success success-saved"> Updated!</span> }
                      {this.state.isUpdating && <button type="submit" disabled className={`btn btn-primary`}>Update Response</button> }
                   </form>

                 </>
             }
           </div>
         </>
     );

   }

}

export default Invite;
//
// const dispatchToPropertyMapper = dispatch => {
//   return {
//     updateInvite: (inviteId, invite) => {
//       invitesService.updateInvite(inviteId, invite).then(invite => {
//         this.setState({invite: invitesActions.updateInvite(invite)});
//       })
//     }
//   };
// }
//
// export default connect(
//     dispatchToPropertyMapper
// )(Invite);
