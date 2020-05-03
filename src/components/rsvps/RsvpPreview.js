import React from "react";
import {Link} from "react-router-dom";
import {littleDate} from "../../util/calendar";
import {time12Hour} from "../../util/clock";

const RsvpPreview = ({ outerWrapClass, headerText, rsvp }) => {

  return (
      <div className={outerWrapClass}>
        <div className="card">
          <h5 className="card-header">{headerText}</h5>
          <div className="card-body">
            <h5 className="card-title">
              Event: {rsvp.event.name}
            </h5>
            <p className="card-subtitle"> {littleDate(rsvp.event.date)} • {time12Hour(rsvp.event.startTime)} </p>
            <div className="pb-2">Your Response: {rsvp.invite.response}
            </div>
            <Link to={`event/${rsvp.event.id}`} className="btn btn-info">View Event</Link>
          </div>
        </div>
      </div>
  );

}

export default RsvpPreview;
