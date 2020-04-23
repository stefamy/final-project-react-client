import React from "react";
import eventsService from "../../services/EventsService";
import invitesService from "../../services/InvitesService";
import {Link} from "react-router-dom";


 class Invite extends React.Component {

   state = {
     invite: {...this.props.invite}
   }

   componentDidMount() {
     if (this.props.event) {
       this.setState({event: this.props.event});
     } else {
       eventsService.findEventById(this.props.invite.eventId)
       .then((event) => this.setState({event: event}));
     }
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
     if (this.props.updateInvite) {
       this.props.updateInvite(this.state.invite.id, this.state.invite);
       this.showUpdateSuccess();
     } else {
        invitesService.updateInvite(this.state.invite.id,
        this.state.invite).then(response => this.showUpdateSuccess());
     }
   }

   render() {
     return (
         <>
           {!this.props.preview &&
           <div className="invite mb-3">
             {this.state.event &&
             <>
               {!this.props.hideEventDetails && <>
                 <div
                     className="invite-response-form bg-white border-top border-left border-right p-3">
                   <div
                       className="row justify-content-between align-items-start">
                     <div className="col">
                       <h3 className="mt-1">{this.state.event.name} </h3>
                       <h5>{this.state.event.description} </h5>
                       <p className="mb-0">{this.state.event.date}</p>
                       <p className="mb-0">{this.state.event.locationName}</p>
                       <p className="mb-0">{this.state.event.locationCity} {this.state.event.locationState}</p>
                     </div>
                     <div className="col-auto">
                       <Link to={`/events/${this.state.event.id}`}
                             className="btn btn-primary">Visit Event Page</Link>
                     </div>
                   </div>
                 </div>
               </>}
               <div className="invite-response-form border mb-3">

                 <div
                     className="assignment-header d-flex justify-content-between align-items-center pl-3 pr-3 pt-2 pb-2 bg-light border-bottom">
                   <div className="form-group m-0"
                        onChange={this.updateResponseChoice.bind(this)}>
                     <div className="form-check form-check-inline pr-3">
                       <label className="form-check-label"
                              htmlFor={`response1 + ${this.props.invite.id}`}>
                         <input className="form-check-input"
                                id={`response1 + ${this.props.invite.id}`}
                                type="radio"
                                name={`response + ${this.props.invite.id}`}
                                value="Yes"
                                defaultChecked={this.props.invite.response
                                === "Yes"}
                         />I'll be there!</label>
                     </div>
                     <div className="form-check form-check-inline pr-3">
                       <label className="form-check-label"
                              htmlFor={`response2 + ${this.props.invite.id}`}>
                         <input className="form-check-input"
                                id={`response2 + ${this.props.invite.id}`}
                                type="radio"
                                name={`response + ${this.props.invite.id}`}
                                value="No"
                                defaultChecked={this.props.invite.response
                                === "No"}
                         />Can't make it</label>
                     </div>
                     <div className="form-check form-check-inline">
                       <label className="form-check-label"
                              htmlFor={`response3 + ${this.props.invite.id}`}>
                         <input className="form-check-input"
                                id={`response3 + ${this.props.invite.id}`}
                                type="radio"
                                name={`response + ${this.props.invite.id}`}
                                value="Pending"
                                defaultChecked={this.props.invite.response
                                === "Pending"}
                         />No response yet</label>
                     </div>
                   </div>
                 </div>

                 <div
                     className="invite-response-body d-flex col pl-0 pr-0 input-group border-0 align-items-stretch">
                   <input type="text"
                          className="form-control border-0"
                          placeholder="Comments for host"
                          defaultValue={this.props.invite.comments || ''}
                          onChange={(e) => this.handleResponseChange('comments',
                              e.target.value)}
                   />
                   <div className="input-group-addon border-left bg-light">
                     {!this.state.isUpdating && !this.state.showSuccess &&
                     <button type="submit"
                             onClick={(e) => this.handleUpdateInvite(e)}
                             className="btn btn-primary special-border-radius">Update
                       Response</button>}
                     {!this.state.isUpdating && this.state.showSuccess &&
                     <button type="submit" disabled
                             className="btn btn-success special-border-radius">Updated!</button>}
                     {this.state.isUpdating && !this.state.showSuccess &&
                     <button type="submit" disabled
                             className="btn btn-light special-border-radius">Update
                       Response</button>}
                   </div>
                 </div>
               </div>
             </>
             }
           </div>
           }
           {this.state.event && this.props.preview &&

           <div className="card">
             <h5 className="card-header">You're invited!</h5>
             <div className="card-body">
               <h5 className="card-title">
                 Event: {this.state.event.name} | {this.state.event.date}
               </h5>
               <div className="pb-2">Your Response: {this.props.invite.response}
               </div>
               <Link to={`events/${this.state.event.id}`} className="btn btn-info">Visit the Event Page</Link>
             </div>
           </div>

           }
         </>
     );

   }

}

export default Invite;
