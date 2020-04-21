import React from "react";
import eventsService from "../../services/EventsService";

class Assignment extends React.Component {

  state = {
    assignment: {...this.props.assignment}
  }

  componentDidMount() {
    if (this.props.event) {
      this.setState({event: this.props.event});
    } else {
      eventsService.findEventById(this.props.assignment.eventId)
      .then((event) => this.setState({event: event}));
    }
  }

  handleResponseChange(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.assignment[attribute] = newContent;
    this.setState(newState);
  }

  componentDidUpdate(prevProps) {
  }

  updateResponseChoice(e) {
    this.handleResponseChange('status', e.target.value);
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

  render() {
    return (
        <>
          <div className="col pb-4">
            {this.state.event &&
            <>
              <h3>Event: {this.state.event.name} </h3>
              <h5>{this.state.event.description} </h5>
              <p>{this.state.event.date} </p>
              <p>{this.props.assignment.title}</p>
              <p>{this.props.assignment.description}</p>
              {/*<p>{this.props.assignment.dateOfRequest}</p>*/}
              {/*<p>{this.props.assignment.dateOfResponse}</p>*/}
              <p>{this.props.assignment.type}</p>
              <form onSubmit={(e) => this.handleUpdateAssignment(e)}>
                <div className="form-group" onChange={this.updateResponseChoice.bind(this)}>
                  <div className="form-check form-check-inline">
                    <label className="form-check-label" htmlFor={`response1 + ${this.props.assignment.id}`}>
                      <input className="form-check-input"
                             id={`response1 + ${this.props.assignment.id}`}
                             type="checkbox"
                             name={`response + ${this.props.assignment.id}`}
                             value="YES"
                             defaultChecked={this.props.assignment.status === "ASSIGNED"}
                      />
                      I can do it!</label>
                  </div>
                  <div className="form-group">
                    <input type="text"
                           className="form-control"
                           placeholder={'Comments for host'}
                           defaultValue={this.props.assignment.assigneeComments || ''}
                           onChange={(e) => this.handleResponseChange('assigneeComments', e.target.value)}
                    />
                  </div>
                </div>
                {!this.state.isUpdating && <button type="submit" className={`btn btn-primary`}>Update Response</button> }
                {this.state.showSuccess && <span className="text-success success-saved"> Updated!</span> }
                {this.state.isUpdating && <button type="submit" disabled className={`btn btn-primary`}>Update Response</button> }
              </form>
            </>
            }
          </div>
        </>
    );

  }

}

export default Assignment;
