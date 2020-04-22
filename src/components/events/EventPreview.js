import React from "react";
import {Link} from "react-router-dom";

const EventPreview = ({ event, headerText, canDelete, handleDeleteEvent, outerWrapClass }) => {

    return (
        <div className={outerWrapClass}>
              <div className="card">
                <h5 className="card-header d-flex justify-content-between">
                  <div className="col pl-0">{headerText} {event.date}</div>
                  {canDelete && <div className="col-auto btn p-0"><i onClick={handleDeleteEvent} className="fa fa-close text-danger"></i></div>}
                </h5>
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <h6 className="card-subtitle">{event.description}</h6>
                  <p className="card-text mt-2">{event.locationName && event.locationName + ' • '}{event.locationCity}{event.locationState && event.locationCity ? ', ' + event.locationState : ''}
                    {/*{event.startTime ? event.startTime : ''} {event.endTime ? ' - ' + event.endTime : ''}*/}
                  </p>
                  <Link to={`/events/${event.id}`}className="btn btn-outline-info">Go to event</Link>
                </div>
              </div>
        </div>
    );

}

export default EventPreview;
