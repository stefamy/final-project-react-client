import React from "react";

const EventPreview = ({ event, userId }) => {

    return (
        <>
            <div className="pb-3">
              <div className="card">
                <div className="card-header">
                  {event.date}
                  {/*{event.startTime ? event.startTime : ''} {event.endTime ? ' - ' + event.endTime : ''}*/}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{event.name}</h5>
                  <h6 className="card-subtitle">{event.description}</h6>
                  <p className="card-text">{event.locationCity} {event.locationState && event.locationCity ? ', ' + event.locationState : ''}</p>
                </div>
              </div>
          </div>
        </>
    );

}

export default EventPreview;
