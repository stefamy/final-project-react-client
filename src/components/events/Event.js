import React from "react";
import eventsService from "../../services/EventsService";
// import assignmentsService from "../../services/AssignmentsService"
// import Assignment from "../assignments/Assignment";
// import userService from "../../services/UserService";
// import userActions from "../../actions/UserActions";
// import assignmentsActions from "../../actions/AssignmentsActions";
// import {connect} from "react-redux";
// import {Link} from "react-router-dom";

class Event extends React.Component {

  state = { }

  componentDidMount() {
    this.setState({
      event: {...this.props.event}
    });
    if (!this.props.event) {
      eventsService.findEventById(this.props.eventId)
      .then((event) => {
        this.setState({event: event});
      });
    } else {
      this.setState({event: this.props.event});
    }
  }

  handleResponseChange(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.event[attribute] = newContent;
    this.setState(newState);;
  }

  componentDidUpdate(prevProps) {
  }

  updateResponseChoice(e) {
    this.handleResponseChange('response', e.target.value);
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

  handleUpdateEvent(e) {
    e.preventDefault();
    this.setState({ isUpdating: true});
    eventsService.updateEvent(this.state.event.id, this.state.event)
    .then(success => this.showUpdateSuccess());
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
              {/*{this.state.assignments &&*/}
              {/*    <>*/}
              {/*  {this.state.assignments.map((assignment, index) => (*/}
              {/*      <Assignment*/}
              {/*          key={index}*/}
              {/*          assignment={assignment}*/}
              {/*          history={this.props.history}*/}
              {/*          // userId={this.state.user.id}*/}
              {/*          event={this.state.event}*/}
              {/*      />*/}
              {/*  ))}*/}
              {/*  </>}*/}

              {/*<Link to={`/events/${this.state.event.id}/assignments`} >View assignments</Link>*/}
              {/*<form onSubmit={(e) => this.handleUpdateEvent(e)}>*/}
              {/*  <div className="form-group" onChange={this.updateResponseChoice.bind(this)}>*/}
              {/*    <div className="form-check form-check-inline">*/}
              {/*      <label className="form-check-label" htmlFor={`response1 + ${this.props.event.id}`}>*/}
              {/*        <input className="form-check-input"*/}
              {/*               id={`response1 + ${this.props.event.id}`}*/}
              {/*               type="radio"*/}
              {/*               name={`response + ${this.props.event.id}`}*/}
              {/*               value="YES"*/}
              {/*               defaultChecked={this.props.event.response === "YES"}*/}
              {/*        />*/}
              {/*        Yes</label>*/}
              {/*    </div>*/}
              {/*    <div className="form-check form-check-inline">*/}
              {/*      <label className="form-check-label" htmlFor={`response2 + ${this.props.event.id}`}>*/}
              {/*        <input className="form-check-input"*/}
              {/*               id={`response2 + ${this.props.event.id}`}*/}
              {/*               type="radio"*/}
              {/*               name={`response + ${this.props.event.id}`}*/}
              {/*               value="NO"*/}
              {/*               defaultChecked={this.props.event.response === "NO"}*/}
              {/*        />*/}
              {/*        No</label>*/}
              {/*    </div>*/}
              {/*    <div className="form-check form-check-inline">*/}
              {/*      <label className="form-check-label" htmlFor={`response3 + ${this.props.event.id}`}>*/}
              {/*        <input className="form-check-input"*/}
              {/*               id={`response3 + ${this.props.event.id}`}*/}
              {/*               type="radio"*/}
              {/*               name={`response + ${this.props.event.id}`}*/}
              {/*               value="PENDING"*/}
              {/*               defaultChecked={this.props.event.response === "PENDING"}*/}
              {/*        />*/}
              {/*        Pending</label>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <div className="form-group">*/}
              {/*    <input type="text"*/}
              {/*           className="form-control"*/}
              {/*           placeholder={'Comments for host'}*/}
              {/*           defaultValue={this.props.event.comments || ''}*/}
              {/*           onChange={(e) => this.handleResponseChange('assigneeComments', e.target.value)}*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*  {!this.state.isUpdating && <button type="submit" className={`btn btn-primary`}>Update Response</button> }*/}
              {/*  {this.state.showSuccess && <span className="text-success success-saved"> Updated!</span> }*/}
              {/*  {this.state.isUpdating && <button type="submit" disabled className={`btn btn-primary`}>Update Response</button> }*/}
              {/*</form>*/}

            </>
            }
          </div>
        </>
    );

  }

}

export default Event;
//
// const stateToPropertyMapper = state => {
//   return {
//     user: state.user.user,
//     events: state.events.events,
//     assignments: state.assignments.assignments
//   };
// };
//
// const dispatchToPropertyMapper = dispatch => {
//   return {
//     findUser: () => {
//       userService.findUser()
//       .then(user => dispatch(userActions.findUser(user)));
//     },
//     findAllAssignmentsForEvent: userId => {
//       assignmentsService.findAssignmentByAssigneeUserId(userId).then(assignments => {
//         dispatch(assignmentsActions.findAllAssignments(assignments));
//       });
//     }
//   };
// };
//
//
// export default connect(
//     stateToPropertyMapper,
//     dispatchToPropertyMapper
// )(Event);
//
