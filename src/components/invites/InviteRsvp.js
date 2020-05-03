import React from "react";

 class InviteRsvp extends React.Component {

   state = {
     updatedInvite: {}
     }


   componentDidUpdate(prevProps, prevState, snapshot) {
     if (prevProps.invite !== this.props.invite) {
       this.setState({updatedInvite: {...this.props.invite}
       });
     }
   }

   handleResponseChange(attribute, newContent) {
     let newState = Object.assign({}, this.state);
     newState.updatedInvite[attribute] = newContent;
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
     this.props.updateInvite(this.state.updatedInvite.id, this.state.updatedInvite);
   }

   render() {

     return (
           <div className="invite-rsvp">
             {this.props.invite &&
               <div className="invite-response-form mt-3">
                   <div className="form-group" onChange={this.updateResponseChoice.bind(this)}>
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

                   <div className="invite-response-body">
                     <input type="text"
                            className="form-control"
                            placeholder="RSVP Comments (will display publicly)"
                            defaultValue={this.props.invite.comments || ''}
                            onChange={(e) => this.handleResponseChange('comments', e.target.value)}
                     />

                     {(this.state.updatedInvite.response !== this.props.invite.response ||
                         this.state.updatedInvite.comments !== this.props.invite.comments) &&
                        <button
                            type="submit"
                            onClick={(e) => this.handleUpdateInvite(e)}
                            className="btn btn-info mt-3">Update Response
                        </button>}
                     {!this.state.showSuccess && this.state.isUpdating && <button
                         type="submit" disabled
                         className="btn btn-success mt-3">Update Response</button>}
                     {this.state.showSuccess && <button
                         type="submit" disabled
                         className="btn btn-success mt-3">Updated!</button>}

               </div>

               </div>
             }

           </div>
     );

   }

}


export default InviteRsvp;
