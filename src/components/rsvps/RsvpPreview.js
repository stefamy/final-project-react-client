import React from "react";
import {Link} from "react-router-dom";

// function badgeClass(response) {
//   switch (response) {
//     case "Yes":
//       return 'badge-success';
//     case "No":
//       return 'badge-secondary';
//     case "Pending":
//       return 'badge-info';
//     case "Maybe":
//       return 'badge-warning';
//     default:
//       return 'badge-warning';
//   }
// }

const RsvpPreview = ({ outerWrapClass, headerText, rsvp }) => {

  return (
      <div className={outerWrapClass}>
        <div className="card">
          <h5 className="card-header">{headerText}</h5>
          <div className="card-body">
            <h5 className="card-title">
              Event: {rsvp.event.name} | {rsvp.event.date}
            </h5>
            <div className="pb-2">Your Response: {rsvp.invite.response}
            </div>
            <Link to={`events/${rsvp.event.id}`} className="btn btn-info">Visit the Event Page</Link>
          </div>
        </div>
      </div>
  );

}

export default RsvpPreview;
