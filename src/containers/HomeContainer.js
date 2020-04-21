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
          {/*{this.props.user &&*/}
          {/*<div>*/}
          {/*  <p>Welcome, {this.props.user.firstName || this.props.user.username}! <Link to="/profile">Visit your profile</Link></p>*/}
          {/*               <p><Link to="/login">Login</Link> or <Link to="/register">register</Link> to get started.</p>
          </div>*/}
          {/*}*/}
          {this.props.user &&
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
