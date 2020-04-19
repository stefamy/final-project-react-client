import React, { Component } from "react";

const EventListItemComponent = ({ event, userId }) => {

    return (
        <>
          <div class="col">
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

export default EventListItemComponent;
