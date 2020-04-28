import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import userService from "../services/UserService";
import userActions from "../actions/UserActions";
import EventPreview from "../components/events/EventPreview";
import SearchBarComponent from "../search/SearchBarComponent";
import RecipeReviewsList from "../components/reviews/RecipeReviewsList";
import Invite from "../components/invites/Invite";


class HomeContainer extends React.Component {

  componentDidMount() {
    console.log('HOME mounted component PROPS:', this.props);
    console.log('HOME mounted component STATE:', this.state);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.user.events !== this.props.user.events) {
      if (this.props.user.events.length) {
        this.setState({nextEvent: this.getNextUpcomingEvent()})
      }
    } else if (prevProps.user.invites !== this.props.user.invites) {
      if (this.props.user.invites.length) {
        this.setState({nextInvite: this.getNextUpcomingEventInvite()})
      }
    }
    console.log('HOME updated component PROPS:', this.props);
    console.log('HOME updated component STATE:', this.state);

  }

  getNextUpcomingEventInvite() {
    return this.props.user.invites.find(invite => new Date(invite.eventDate) >= new Date());
  }

  getNextUpcomingEvent() {
    return this.props.user.events.find(event => new Date(event.date) >= new Date());
  }

  render() {
    const profile = this.props.user ? this.props.user.profile : null;

    return (
        <>
          {!profile &&
          <div>
            <div className="mb-5 p-5 bg-white hero-unit rounded border">
              <h1>Welcome to the Potluck Party Planner! <span aria-label="jsx-a11y/accessible-emoji" role="img">🥳</span></h1>
              <h4>pot·​luck | ˈpät-ˈlək | <span className="subtitle"><em>noun</em></span></h4>
              <p>A meal or party to which each of the guests contributes a dish.</p>
            </div>
            <div className="row pb-5">
              <div className="col-lg-6 col-12 pb-5">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Let's Get Started!</h5>
                    <p className="card-text">Log in or register as a new user.</p>
                    <Link to="/login" className="btn btn-outline-info mr-2">Log in</Link>
                    <Link to="/register" className="btn btn-outline-info">Register</Link>
                  </div>
                </div>
            </div>
              <div className="col-lg-6 col-12 pb-5">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Unsure what to bring to your
                      next party?</h5>
                    <p className="card-titlcol-md-6e">Search through our
                      database of 1000s of recipes.</p>
                    <SearchBarComponent
                        history={this.props.history}/>
                  </div>
                </div>
              </div>
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
            </div>
          </div>
          </div>
          }
            {profile &&
            <div>
              <div className="mb-5 p-5 bg-white hero-unit rounded border">
                <h1>Welcome to the Party Planner App <span aria-label="jsx-a11y/accessible-emoji" role="img">🥳</span></h1>
                <p>Organizing and delegating tasks for your next group event so
                  that you don't have to!</p>
              </div>
              <div className="row">
                  <div className="col-lg-6 col-12 pb-5">
                    {this.state && this.state.nextEvent && <>
                      <EventPreview
                          headerText="Next Upcoming Event: "
                          event={this.state.nextEvent}
                          history={this.props.history}
                          userId={profile.id}
                      />
                    </>}
                    {this.state && !this.state.nextEvent
                    && this.state.nextInvite && <>
                      <Invite
                          preview={true}
                          invite={this.state.nextInvite}
                          history={this.props.history}
                          userId={profile.id}

                      />
                    </> }
                    {(!this.state || (!this.state.nextEvent && !this.state.nextInvite)) &&
                    <div className="card">
                      <h5 className="card-header">No upcoming events.</h5>
                      <div className="card-body">
                        <h5 className="card-title">Want to create one?</h5>
                        <p className="card-text">Plan your next event or party and get organized!</p>
                        <Link to="/events" className="btn btn-outline-info">Go to
                          events</Link>
                      </div>
                    </div>}
                  </div>

                <div className="col-lg-6 col-12 pb-5">
                      <div className="card">
                      <h5 className="card-header">Recent Recipe Review</h5>
                      <div className="card-body p-0">
                        <RecipeReviewsList
                            findRecent={true}
                            limit={1}
                            linkToRecipe={true}
                            wrapClass=""
                            hideForm={true}
                        />
                      </div>
                  </div>
                </div>

                  <div className="col-12">
                    <div className="card">
                      <h5 className="card-header">Unsure what to bring to your
                        next party?</h5>
                      <div className="card-body">
                        <h5 className="card-titlcol-md-6e">Search through our
                          database of 1000s of recipes.</h5>
                        <SearchBarComponent
                            history={this.props.history}/>
                      </div>
                    </div>
                  </div>
              </div>

            </div>

            }
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
  )(HomeContainer);
