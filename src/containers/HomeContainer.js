// import RecipeFinderContainer from "./RecipeFinderContainer";
import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";

/**
 * @param {{queryText:string}} queryText
 * @param {{recipeId:string}} recipeId
 */
class HomeContainer extends React.Component {

  componentDidMount() {
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  render() {
    return (
        <>
          {!this.props.user.id &&
          <div>
            <div className="mb-5 p-5 bg-white hero-unit rounded border">
              <h1>Welcome to the Potluck Party Planner!</h1>
              <h4>pot·​luck | ˈpät-ˈlək | <span className="subtitle"><em>noun</em></span></h4>
              <p>A meal or party to which each of the guests contributes a dish.</p>
              <p><a href="/about" className="btn btn-primary btn-large">Learn more</a></p>
            </div>
            <div className="row pb-5">
              <div className="col-lg-6 col-12 pb-5">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Let's Get Started!</h5>
                    <p className="card-text">Log in or register as a new user.</p>
                    <a href="/login" className="btn btn-primary mr-2">Log in</a>
                    <a href="/login" className="btn btn-primary">Register</a>

                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12 pb-5">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Recent Recipe Review</h5>
                    <p className="card-text">Check out the recipe.</p>
                    <a href="/" className="btn btn-primary mr-2">Get the recipe</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
          {this.props.user.id &&
            <div>
              <div className="mb-5 p-5 bg-white hero-unit rounded border">
                  <h1>Welcome to the Party Planner App!</h1>
                  <p>Tagline</p>
                  <p><a href="#" className="btn btn-primary btn-large">Learn more</a></p>
              </div>
              <div className="row">
                <div className="col-lg-6 col-12 pb-5">
                  <div className="card">
                    <h5 className="card-header">Hosting a Party?</h5>
                    <div className="card-body">
                      <h5 className="card-title">Create an Event</h5>
                      <p className="card-text">With supporting text below as a
                        natural lead-in to additional content.</p>
                      <a href="/events" className="btn btn-primary">Go to events</a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-12 pb-5">
                <div className="card">
                  <h5 className="card-header">Receive an Invite?</h5>
                  <div className="card-body">
                    <h5 className="card-title">RSVP to an Event</h5>
                    <p className="card-text">With supporting text below as a
                      natural lead-in to additional content.</p>
                    <a href="/invites" className="btn btn-primary">Go to invites</a>
                  </div>
                </div>
                </div>
              </div>
              <div className="row pb-5">
                <div className="col">
                  <div className="card">
                    <h5 className="card-header">Featured</h5>
                    <div className="card-body">
                      <h5 className="card-title">Special title treatment</h5>
                      <p className="card-text">With supporting text below as a
                        natural lead-in to additional content.</p>
                      <a href="/assignments" className="btn btn-primary">Go to assignments</a>
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

  export default connect(
      stateToPropertyMapper
  )(HomeContainer);
