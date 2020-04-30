import React from "react";
import {Link} from "react-router-dom";
import {littleDate} from "../../util/calendar";

const EventPreview = ({ event, headerText, canDelete, handleDeleteEvent, outerWrapClass }) => {

    return (
        <div className={outerWrapClass}>
              <div className="card">
                {headerText &&
                <h5 className="card-header d-flex justify-content-between">
                  <div className="col pl-0">{headerText}</div>
                </h5>
                }
                <div className="card-body">
                  {canDelete && <div className="float-right pl-2"><i onClick={handleDeleteEvent} className="fa fa-close text-danger"></i></div>}
                  <h5 className="card-title">{event.name}</h5>
                  <h6 className="card-subtitle">{event.description}</h6>
                  <p className="card-text mt-2">{littleDate(event.date)}{event.startTime && <span> • {event.startTime}</span>}</p>
                  <p className="card-text mt-2">
                      {event.locationName && <span>{event.locationName}<br/></span>}
                      {event.locationCity && event.locationState && <span>{event.locationCity}, {event.locationState}<br/></span>}
                      {event.locationCity && !event.locationState && <span>{event.locationCity}<br/></span>}
                      {!event.locationCity && event.locationState && <span>{event.locationState}<br/></span>}
                  </p>
                  <Link to={`/event/${event.id}`}className="btn btn-outline-info">Go to event</Link>
                </div>
              </div>
        </div>
    );

}

export default EventPreview;
