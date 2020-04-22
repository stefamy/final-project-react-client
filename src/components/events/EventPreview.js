import React from "react";
import {Link} from "react-router-dom";

const EventPreview = ({ event, headerText }) => {

    return (
        <>
            <div className="pb-3">
              <div className="card">
                <h5 className="card-header">{headerText} {event.date}</h5>
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <h6 className="card-subtitle">{event.description}</h6>
                  <p className="card-text mt-2">{event.locationName && event.locationName + ' • '}{event.locationCity}{event.locationState && event.locationCity ? ', ' + event.locationState : ''}
                    {/*{event.startTime ? event.startTime : ''} {event.endTime ? ' - ' + event.endTime : ''}*/}
                  </p>
                  <Link to={`/events/${event.id}`}className="btn btn-primary">Go to event</Link>
                </div>
              </div>
          </div>
        </>
    );

}

export default EventPreview;
