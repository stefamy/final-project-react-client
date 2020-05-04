import React, {Component} from "react";
import {Link} from "react-router-dom";
import {littleDate} from "../../util/calendar";
import {time12Hour} from "../../util/clock"
import ModalConfirm from "../structural/ModalConfirm";

class EventPreview extends Component {

  state = {
    showConfirm: false,
  }

  confirmDeleteEvent(e) {
    e.preventDefault();
    this.setState({showConfirm: true});
  }

  stopShowConfirm() {
    this.setState({showConfirm: false});
  }

  render() {
    const event = this.props.event;

    return (
        <div className={this.props.outerWrapClass}>
          <div className="card">
            {this.props.headerText &&
            <h5 className="card-header d-flex justify-content-between">
              <div className="col pl-0">{this.props.headerText}</div>
            </h5>
            }
            <div className="card-body">
              {this.props.canDelete && <div className="float-right pl-2"><i
                  onClick={(e) => this.confirmDeleteEvent(e)}
                  className="btn fa fa-close text-danger"></i></div>}
              <h5 className="card-title">{event.name}</h5>
              <h6 className="card-subtitle">{event.description}</h6>
              <p className="card-text mt-2">{littleDate(
                  event.date)}{event.startTime &&
              <span> • {time12Hour(event.startTime)}</span>}</p>
              <Link to={`/event/${event.id}`} className="btn btn-info">View Event</Link>
            </div>
          </div>
          <ModalConfirm
              show={this.state.showConfirm}
              headerText="Delete this event?"
              bodyText="Are you sure you want to delete this event and all of its data? This action cannot be undone."
              yesText="Delete Event"
              noText="Cancel"
              yesBtnClass="btn btn-danger"
              noBtnClass="btn btn-secondary"
              handleClose={() => this.stopShowConfirm()}
              yesFunction={() => this.props.deleteEvent()}
          />
        </div>
    );
  }
}

export default EventPreview;
