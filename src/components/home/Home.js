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
    return this.props.events.find(event => new Date(event.date) >= new Date());
  }

  getUpcomingTask() {
    return this.props.tasks.find(task => task.id > 0);
  }

  getNextRsvp() {
    return this.props.rsvps.find(rsvp => new Date(rsvp.event.date) >= new Date()
        && rsvp.event.hostId !== this.props.profile.id);
  }

  render() {

    return (
        <>
          <Hero />

          {this.props.userId && <div className="row">

            <div className="col-md-6 col-12 pb-lg-5 mb-2">

              {this.props.events.length &&
                    <EventPreview
                        headerText="You're Hosting!"
                        event={this.getNextHostedEvent()}
                        history={this.props.history}
                        userId={this.props.userId}
                    />}
              {!this.props.events.length && this.props.invites.length &&
                    <RsvpPreview
                        headerText="You're Invited!"
                        rsvp={this.getNextRsvp()}
                        history={this.props.history}
                        userId={this.props.userId}
                    />}
              {!this.props.events.length && !this.props.invites.length &&
                  <Card
                      header="No upcoming events."
                      title="Want to create one?"
                      text="Plan your next event or party and get organized!"
                      linkUrl="/events"
                      linkText="Go to events"
                    />
                 }

            </div> {/* End widget 1 */}

            <div className="col-md-6 col-12 pb-lg-5 mb-2">

              {this.props.tasks.length &&
                  <TaskPreview
                      headerText="Your Assigned Tasks"
                      task={this.getUpcomingTask()}
                      history={this.props.history}
                      userId={this.props.userId}
                  />}
              {!this.props.tasks.length &&
                <Card
                    header="Upcoming tasks"
                    title="No upcoming tasks"
                    text="Sign up to bring a dish or help out at your next party."
                    linkUrl="/invites"
                    linkText="Go to invites"
                />}

            </div> {/* End widget 2 */}

            <div className="col-md-6 col-12 pb-lg-5 mb-2">
              <Card
                  header="Find your next recipe!"
                  title="Unsure what to bring to your next event?"
                  text="Search our catalog of recipes and read reviews from other users."
                  cta={<div className="col-md-8 col pl-0 pr-0"><SearchBar /></div>}
              />
            </div>  {/* End widget 3 */}

            <div className="col-md-6 col-12 pb-lg-5 mb-2">
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

          {!this.props.profile &&  <div className="row">
            <div className="col-md-6 col-12 pb-lg-5 mb-2">
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

            <div className="col-md-6 col-12 pb-lg-5 mb-2">
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

            <div className="col-12 pb-lg-5 mb-2">
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
    userId: state.user.userId,
    profile: state.user.profile,
    events: state.user.events,
    tasks: state.user.tasks,
    invites: state.user.invites
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
