import React from "react";
import userActions from "../../actions/UserActions";
import userService from "../../services/UserService";
import EventPreview from "../events/EventPreview";
import { connect } from "react-redux";
import eventsService from "../../services/EventService";
import TaskList from "../tasks/UserTaskList";
import {Link} from "react-router-dom";
import RecipeReviewsList from "../reviews/RecipeReviewsList";

class User extends React.Component {

  state = {
    userViewing: { },
    viewingOwnProfile: false,
    viewingGuestMutualEvent: false
  }

  viewingSelf() {
    return this.props.user.id === this.state.userViewing.id;
  }

  componentDidMount() {
    // Find profile for user viewing:
    if (this.props.profile) {
      this.setState({
        userViewing: {...this.props.profile},
        viewingOwnProfile: true,
      });
    } else {
      userService.findPublicProfile(this.props.match.params.username)
      .then(profile => this.setState({userViewing: profile}));
      this.checkUserRelationship();
    }
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.user.id !== this.props.user.id) {
        this.checkUserRelationship();
      }
  }

  checkUserRelationship() {
    if (this.viewingSelf()) {
      this.setState({
        userViewing: this.props.user.profile,
        viewingOwnProfile: true,
        viewingGuestMutualEvent: true
      });
    } else {
      eventsService.findEventsByGuestId(this.state.userViewing.id)
      .then(events => {
        this.setState({userViewingEvents: events});
        this.setState(
            {viewingGuestMutualEvent: this.haveMutualEvents(events)});
      });
    }
  }

  haveMutualEvents(events)  {
  for (let i = 0; i < events.length; i++) {
    if (this.props.user.rsvps.find(rsvp => rsvp.event.id === events[i].id)) {
        return true;
    }
  }
  return false;
  }


  render() {
    return(
        <div className="bg-white border p-5">
          <div className="row">
              <div className="col-12">
                <h1>Profile
                  {this.props.profile && <button className="btn pt-0" type="submit" onClick={this.props.edit}><i className="fa fa-pencil text-success"></i></button>}
                  {!this.props.profile &&  this.state.viewingOwnProfile && <Link to="/profile/user/edit" className="btn pt-0" type="submit" onClick={this.props.edit}><i className="fa fa-pencil text-success"></i></Link>}</h1>

                <hr/>
              </div>
              {this.state.userViewing &&
              <div className="col-lg-7 col-12">
                <h2>
                  {this.state.userViewing.firstName} {String(this.state.userViewing.lastName).charAt(0)}. {this.state.viewingOwnProfile && " (that's you!)"}</h2>
                {this.state.userViewing.city && !this.state.userViewing.state && <p>{this.state.userViewing.city}</p> }
                {this.state.userViewing.city && this.state.userViewing.state &&
                  <p>{this.state.userViewing.city}, {this.state.userViewing.state}</p> }
                <hr/>
                <h4>Location & Contact</h4>
                {!this.state.viewingGuestMutualEvent &&
                <p>Contact information is only visible to users with mutual events.</p>
                }
                {this.state.viewingGuestMutualEvent &&
                <p>
                  {this.state.userViewing.email && <span>{this.state.userViewing.email}<br/></span>}
                  {this.state.userViewing.phone && <span>{this.state.userViewing.phone}<br/></span>}
                </p>
                }
                {this.state.viewingGuestMutualEvent &&
                <p>
                  {this.state.viewingOwnProfile && <>
                    {this.state.userViewing.streetAddress1 &&
                    <span>{this.state.userViewing.streetAddress1}<br/></span>}
                    {this.state.userViewing.streetAddress2 &&
                    <span>{this.state.userViewing.streetAddress2}<br/></span>}
                  </> }
                  {this.state.userViewing.city && !this.state.userViewing.state
                  && <span>{this.state.userViewing.city}</span>}
                  {this.state.userViewing.city && this.state.userViewing.state
                  &&
                  <span>{this.state.userViewing.city}, {this.state.userViewing.state} </span>}
                  {this.state.userViewing.zip &&
                  <span>{this.state.userViewing.zip} <br/></span>}
                </p>
                }
                <hr/>
                <h4>Dietary Preferences</h4>
                {!this.state.viewingGuestMutualEvent &&
                  <p>Dietary preferences are only visible to users with mutual events.</p>
                }
                {this.state.viewingGuestMutualEvent &&
                <ul className="list-group list-group-flush">
                  <li className="list-group-item ml-0 pl-0">
                    Gluten Free:
                    {this.state.userViewing.glutenFree === 1 && <b> Yes</b>}
                    {this.state.userViewing.glutenFree === 0 && " No"}
                    {(this.state.userViewing.glutenFree !== 1
                        && this.state.userViewing.glutenFree !== 0) && " Unknown"}
                  </li>
                  <li className="list-group-item ml-0 pl-0">
                    Vegetarian:
                    {this.state.userViewing.vegetarian === 1 && <b> Yes</b>}
                    {this.state.userViewing.vegetarian === 0 && " No"}
                    {(this.state.userViewing.vegetarian !== 1
                    && this.state.userViewing.vegetarian !== 0) && " Unknown"}
                  </li>
                  <li className="list-group-item ml-0 pl-0">
                    Vegan:
                    {this.state.userViewing.vegan === 1 && <b> Yes</b>}
                    {this.state.userViewing.vegan === 0 && " No"}
                    {(this.state.userViewing.vegan !== 1
                        && this.state.userViewing.vegan !== 0) && " Unknown"}
                  </li>
                  <li className="list-group-item ml-0 pl-0">
                    Nut Allergy:
                    {this.state.userViewing.nutAllergy === 1 && <b> Yes</b>}
                    {this.state.userViewing.nutAllergy === 0 && " No"}
                    {(this.state.userViewing.nutAllergy !== 1
                        && this.state.userViewing.nutAllergy !== 0) && " Unknown"}
                  </li>
                  <li className="list-group-item ml-0 pl-0">
                    Other Dietary Restrictions:
                    {" " + (this.state.userViewing.otherDietaryRestrictions
                        || "None listed")}
                  </li>
                  <li className="list-group-item ml-0 pl-0">
                    Special Requests:
                    {" " + (this.state.userViewing.specialRequests
                        || "None listed")}
                  </li>
                </ul>
                }
              </div>}
            {!this.state.userViewing &&
            <p>No profile found for that username.</p>
            }
            {this.state.userViewing &&
            <div className="col-lg-5 col-12">
              {(this.state.viewingGuestMutualEvent
                  || this.state.viewingOwnProfile)
              && this.state.userViewingEvents && <>
                <h4 className="pt-2 pb-2">Upcoming Events</h4>
                {this.state.userViewingEvents.map((event, index) => (
                    <EventPreview
                        key={index}
                        event={event}
                        history={this.props.history}
                        userId={this.props.user.id}
                        outerWrapClass={"mb-2"}
                    />
                ))}
                {!this.state.userViewingEvents.length &&
                <div className="border p-3">No events found.</div>
                }
              </>}
              {(this.state.viewingGuestMutualEvent
                  || this.state.viewingOwnProfile) && <>
                <h4 className="pt-2 pb-2">Tasks</h4>
                <TaskList
                    history={this.props.history}
                    userId={this.state.userViewing.id}
                    hideForm={true}
                    viewingProfile={true}
                />
              </>}
              {this.props.user.id && <>
                <h4 className="pt-2 pb-2">Recipe Reviews</h4>
                <RecipeReviewsList
                    userId={this.state.userViewing.id}
                    linkToRecipe={true}
                    wrapClass="border rounded p-2 mb-3"
                />
              </>
              }
            </div>
            }
            </div>
        </div>)
  }

}


const stateToPropertyMapper = state => {
  return {
    user: state.user.user,
    invites: state.invites.invites
  };
};

const dispatchToPropertyMapper = dispatch => {
  return {}
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(User);
