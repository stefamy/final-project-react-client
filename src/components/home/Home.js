import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import userService from "../../services/UserService";
import userActions from "../../actions/UserActions";
import RsvpPreview from "../rsvps/RsvpPreview";
import EventPreview from "../events/EventPreview";
import AssignmentPreview from "../assignments/AssignmentPreview";
import SearchBar from "../../search/SearchBar";
import RecipeReviewsList from "../reviews/RecipeReviewsList";
import Hero from "./Hero";

class Home extends React.Component {

  componentDidMount() {
    console.log('1 this state', this.state);
    console.log('1 this props', this.props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('2 this state', this.state);
    console.log('2 this props', this.props);
  }

  getNextHostedEvent() {
    return this.props.user.hostedEvents.find(event => new Date(event.date) >= new Date());
  }

  getUpcomingAssignment() {
    return this.props.user.assignments.find(assignment => assignment.id > 0);
  }

  getNextRsvp() {
    return this.props.user.rsvps.find(rsvp => new Date(rsvp.event.date) >= new Date()
        && rsvp.event.hostId !== this.props.user.profile.id);
  }

  render() {
    const profile = this.props.user ? this.props.user.profile : null;

    return (
        <>
          <Hero />
          {profile && <div className="row">

                  <div className="col-lg-6 col-12 pb-5">
                    {this.props.user.hostedEvents && <>
                      <EventPreview
                          headerText="You're Hosting!"
                          event={this.getNextHostedEvent()}
                          history={this.props.history}
                          userId={profile.id}
                      />
                    </>}
                    {!this.props.user.hostedEvents && this.props.user.rsvps && <>
                      <RsvpPreview
                          headerText="You're Invited!"
                          rsvp={this.getNextRsvp()}
                          history={this.props.history}
                          userId={profile.id}

                      />
                    </>}
                    {!this.props.user.hostedEvents && !this.props.user.rsvps && <>
                      <div className="card">
                        <h5 className="card-header">No upcoming events.</h5>
                        <div className="card-body">
                          <h5 className="card-title">Want to create one?</h5>
                          <p className="card-text">Plan your next event or party and get organized!</p>
                          <Link to="/events" className="btn btn-outline-info">Go to
                            events</Link>
                        </div>
                      </div>
                    </>}
                  </div>
                  <div className="col-lg-6 col-12 pb-5">
                    <AssignmentPreview
                        headerText="Upcoming Assignment"
                        assignment={this.getUpcomingAssignment()}
                        history={this.props.history}
                        userId={profile.id}
                    />
                  </div>
                    {/*<div className="card">*/}
                    {/*  <h5 className="card-header">Upcoming assignments</h5>*/}
                    {/*  <div className="card-body">*/}
                    {/*    <h5 className="card-title">asdfsdf</h5>*/}
                    {/*    <p className="card-text">asdfsdaf</p>*/}
                    {/*    <Link to="/events" className="btn btn-outline-info">Go to*/}
                    {/*      assignments</Link>*/}
                    {/*  </div>*/}
                    {/*</div>*/}

             {/*<div className="col-12">*/}
             {/*      <div className="card">*/}
             {/*        <h5 className="card-header">Unsure what to bring to your*/}
             {/*          next party?</h5>*/}
             {/*        <div className="card-body">*/}
             {/*          <h5 className="card-titlcol-md-6e">Search through our*/}
             {/*            database of 1000s of recipes.</h5>*/}
             {/*          <SearchBar*/}
             {/*              history={this.props.history}/>*/}
             {/*        </div>*/}
             {/*      </div>*/}
             {/*    </div>*/}

            </div>
          }

          {/*{profile && <div className="row">*/}

          {/*  <div className="col-lg-6 col-12 pb-5">*/}
          {/*    <div className="card">*/}
          {/*      <div className="card-body">*/}
          {/*        <h5 className="card-title">Unsure what to bring to your*/}
          {/*          next party?</h5>*/}
          {/*        <p className="card-titlcol-md-6e">Search through our*/}
          {/*          database of 1000s of recipes.</p>*/}
          {/*        <SearchBar*/}
          {/*            history={this.props.history}/>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className="col-12 mb-3">*/}
          {/*    <div className="card">*/}
          {/*      <h5 className="card-header">Recent Recipe Reviews</h5>*/}
          {/*      <div className="card-body">*/}
          {/*        <RecipeReviewsList*/}
          {/*            findRecent={true}*/}
          {/*            linkToRecipe={true}*/}
          {/*            limit={3}*/}
          {/*            alignHorizontal={true}*/}
          {/*            wrapClass="text-center"*/}
          {/*            hideForm={true}*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}

          {/*</div> }*/}
        </>
    );
  }
}

const stateToPropertyMapper = state => {
  return {
    user: state.user.user,
    events: state.events.events,
    assignments: state.assignments.assignments,
    invites: state.invites.invites
  };
};


const dispatchToPropertyMapper = dispatch => {
  return {
    findAllUserData: () => {
      userService.findCurrentUserData().then(user => {
        if (user) {
          dispatch(userActions.findCurrentUserData(user));
        }
       });
    },
  };
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(Home);
