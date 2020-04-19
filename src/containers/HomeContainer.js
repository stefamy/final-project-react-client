import RecipeFinderContainer from "./RecipeFinderContainer";
import React from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";

/**
 * @param {{queryText:string}} queryText
 * @param {{recipeId:string}} recipeId
 */
class HomeContainer extends React.Component {

  componentDidMount() {
    console.log('this props 1', this.props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      console.log('this props 2', this.props);
  }

  render() {
    return (
        <>
          {this.props.user &&
          <div>
            <p>Welcome, {this.props.user.firstName || this.props.user.username}! <Link to="/profile">Visit your profile</Link></p>
          </div>
          }
          {!this.props.user &&
            <div>
              <p>Welcome to the Party Planner App! <Link to="/login">Login</Link> or <Link to="/register">register</Link> to get started.</p>
            </div>
          }
        </>
    );
  }
}

  const stateToPropertyMapper = state => {
    return {
      user: state.user.user
    };
  };

  export default connect(
      stateToPropertyMapper
  )(HomeContainer);
