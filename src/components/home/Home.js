import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import RsvpPreview from "../rsvps/RsvpPreview";
import EventPreview from "../events/EventPreview";
import TaskPreview from "../tasks/TaskPreview";
import SearchBar from "../../search/SearchBar";
import RecipeReviewsList from "../reviews/RecipeReviewsList";
import Hero from "./Hero";
import Card from "../structural/Card";

class Home extends React.Component {

  componentDidMount() { }

  componentDidUpdate(prevProps, prevState, snapshot) { }

  getNextHostedEvent() {
    return this.props.user.hostedEvents.find(event => new Date(event.date) >= new Date());
  }

  getUpcomingTask() {
    return this.props.user.tasks.find(task => task.id > 0);
  }

  getNextRsvp() {
    return this.props.user.rsvps.find(rsvp => new Date(rsvp.event.date) >= new Date()
        && rsvp.event.hostId !== this.props.user.profile.id);
  }

  render() {

    return (
        <>
          <Hero />

          {this.props.user.profile && <div className="row">

            <div className="col-lg-6 col-12 pb-5">

              {this.props.user.hostedEvents.length > 0 &&
                    <EventPreview
                        headerText="You're Hosting!"
                        event={this.getNextHostedEvent()}
                        history={this.props.history}
                        userId={this.props.user.profile.id}
                    />}
              {!this.props.user.hostedEvents.length > 0 && this.props.user.rsvps.length > 0 &&
                    <RsvpPreview
                        headerText="You're Invited!"
                        rsvp={this.getNextRsvp()}
                        history={this.props.history}
                        userId={this.props.user.profile.id}
                    />}
              {!this.props.user.hostedEvents.length > 0 && !this.props.user.rsvps.length > 0 &&
                  <Card
                      header="No upcoming events."
                      title="Want to create one?"
                      text="Plan your next event or party and get organized!"
                      linkUrl="/events"
                      linkText="Go to events"
                    />
                 }

            </div> {/* End widget 1 */}

            <div className="col-lg-6 col-12 pb-5">

              {this.props.user.tasks.length > 0 &&
                  <TaskPreview
                      headerText="Your Assigned Tasks"
                      task={this.getUpcomingTask()}
                      history={this.props.history}
                      userId={this.props.user.profile.id}
                  />}
              {!this.props.user.tasks.length &&
                <Card
                    header="Upcoming tasks"
                    title="No upcoming tasks"
                    text="Sign up to bring a dish or help out at your next party."
                    linkUrl="/invites"
                    linkText="Go to invites"
                />}

            </div> {/* End widget 2 */}

            <div className="col-lg-6 col-12 pb-5">
              <Card
                  header="Find your next recipe!"
                  title="Unsure what to bring to your next event?"
                  text="Search our catalog of recipes and read reviews from other users."
                  cta={<div className="col-md-8 col pl-0 pr-0"><SearchBar /></div>}
              />
            </div>  {/* End widget 3 */}

            <div className="col-lg-6 col-12 pb-5">
              <Card
                  header="Recently Reviewed"
                  cta={<RecipeReviewsList
                      findRecent={true}
                      linkToRecipe={true}
                      limit={1}
                      wrapClass=" "
                      hideForm={true}
                  /> /* TODO Just one widget preview */ }
              />

            </div> {/* End widget 3 */}

          </div>}  {/* End logged in user */}

          {!this.props.user.profile &&  <div className="row">
            <div className="col-lg-6 col-12 pb-5">
              <div className="card">
                <h5 className="card-header">It's party time!</h5>
                <div className="card-body">
                  <h5 className="card-title">Plan your next event or RSVP to an invite.</h5>
                  <p className="card-text">Log in to an existing account or register to get started.</p>
                  <Link to="/login" className="btn btn-outline-info mr-3">Login</Link>
                  <Link to="/register" className="btn btn-outline-info">Register</Link>
                </div>
              </div>
            </div>   {/* End widget 1 */}

            <div className="col-lg-6 col-12 pb-5">
              <div className="card">
                <h5 className="card-header">Find your next recipe!</h5>
                <div className="card-body">
                  <h5 className="card-title">Unsure what to bring to your next event?</h5>
                  <p className="card-text">Search our catalog of recipes and read reviews from other users.</p>
                  <div className="col-md-8 col pl-0 pr-0">
                    <SearchBar />
                  </div>
                </div>
              </div>
            </div>  {/* End widget 2 */}

            <div className="col-12 mb-3">
              <div className="card">
                <h5 className="card-header">Recent Recipe Reviews</h5>
                <div className="card-body">
                  <RecipeReviewsList
                      findRecent={true}
                      linkToRecipe={true}
                      limit={3}
                      alignHorizontal={true}
                      wrapClass="text-center"
                      hideForm={true}
                  />
                </div>
              </div>
            </div> {/* End widget 3 */}

          </div> } {/* End guest user */}

        </>
    );
  }
}

const stateToPropertyMapper = state => {
  return {
    user: state.user.user,
    events: state.events.events,
    tasks: state.tasks.tasks,
    invites: state.invites.invites
  };
};


const dispatchToPropertyMapper = dispatch => {
  return {
    // findAllUserData: () => {
    //   userService.findCurrentUserData().then(user => {
    //     if (user) {
    //       dispatch(userActions.findCurrentUserData(user));
    //     }
    //    });
    // },
  };
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(Home);
