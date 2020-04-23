import React from "react";
import RecipeCard from './RecipeCard';
import userService from "../../services/UserService";
import userActions from "../../actions/UserActions";
import assignmentsService from "../../services/AssignmentsService";
import assignmentsActions from "../../actions/AssignmentsActions";
import {connect} from "react-redux";
import Assignment from "../assignments/Assignment";
import SearchBarComponent from "../../search/SearchBarComponent";
import {Link} from "react-router-dom";
import {retrieveRecipe} from "../../services/RecipeService";
import RecipeReviewsList from "./RecipeReviewsList";

class RecipeDetailsComponent extends React.Component {

  state = {
    recipeData: ''
  };

  componentDidMount() {
    this.handleRetrieveRecipe();
    if (this.props.user.id) {
      this.props.findAssignmentByAssigneeUserId(this.props.user.id);
    } else {
      this.props.findUser();
        this.setState({guestUser: true})
    }

  }

  handleRetrieveRecipe() {
    retrieveRecipe(this.props.recipeId).then(data => {
      if (data) {
        this.setState({ recipeData: data });
      } else {
        this.setState({recipeNotFound: true});
      }
    });
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.recipeId !== this.props.recipeId) {
      this.handleRetrieveRecipe();
    }
    if (prevProps.user && (this.props.user.id !== prevProps.user.id)) {
      this.props.findAssignmentByAssigneeUserId(this.props.user.id);
      this.setState({guestUser: false});
    }
  }


  render() {
    const recipe = this.state.recipeData;
    return (
        <div>
          <div className="title-area d-flex align-items-center justify-content-between p-3 border rounded bg-white mb-3">
            <h4>Recipe Details</h4>
            <button type="button" className="btn btn-info" onClick={this.props.history.goBack}>Back</button>
          </div>
          {recipe &&
            <div className="recipe-details row">
              <div className="col-md-7 col-12">
              <RecipeCard
                  title={recipe.title}
                  image={recipe.image}
                  time={recipe.readyInMinutes}
                  servings={recipe.servings}
                  ingredients={recipe.extendedIngredients}
                  instructions={recipe.analyzedInstructions}
                  courses={recipe.dishTypes}
                  />
              <a href={`${recipe.sourceUrl}`}><span className="recipe-source"> Source: {recipe.sourceName}</span></a>
              </div>

              <div className="col-md-5 col-12">
                  <RecipeReviewsList
                      recipeId={recipe.id}
                      recipeName={recipe.title}
                      wrapClass=" bg-white border rounded p-3 mb-3"
                      showCreateReview={true}
                      history={this.props.history} />

                <div className=" bg-white border rounded p-3 mb-3">
                <h5>Search again</h5>
                <SearchBarComponent
                  history={this.props.history}/>
                </div>
              {!this.state.guestUser && this.props.assignments &&
              <div className=" bg-white border rounded p-3 mb-3">
                <h5>Your Upcoming Assignments</h5>
                {this.props.assignments.map((assignment, index) => (
                    <Assignment
                        key={index}
                        assignment={assignment}
                        history={this.props.history}
                        userId={this.props.user.id}
                        hideForm={true}
                    />
                ))}
              </div>
              }
                {this.state.guestUser  &&
                <div className=" bg-white border rounded p-3 mb-3">
                  <h5 className="card-title">Plan or RSVP to an Event!</h5>
                  <p className="card-text">Log in or register as a new user.</p>
                  <Link to="/login" className="btn btn-outline-info mr-2">Log in</Link>
                  <Link to="/register" className="btn btn-outline-info">Register</Link>
                </div>
                }
              </div>
          </div>
          }
        </div>
    );
  }

}


const stateToPropertyMapper = state => {
  return {
    user: state.user.user,
    assignments: state.assignments.assignments
  };
};


const dispatchToPropertyMapper = dispatch => {
  return {
    findUser: () => {
      userService.findUser()
      .then(user => dispatch(userActions.findUser(user)));
    },
    updateAssignment: (assignmentId, assignment) => {
      assignmentsService.updateAssignment(assignmentId, assignment).then(assignment => {
        dispatch(assignmentsActions.updateAssignment(assignment));
      });
    },
    findAssignmentByAssigneeUserId: userId => {
      assignmentsService.findAssignmentByAssigneeUserId(userId).then(assignments => {
        dispatch(assignmentsActions.findAllAssignments(assignments));
      });
    }
  };
};


export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(RecipeDetailsComponent);
