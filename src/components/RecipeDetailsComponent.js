import React from "react";
import RecipeCard from './RecipeCard';
import userService from "../services/UserService";
import userActions from "../actions/UserActions";
import assignmentsService from "../services/AssignmentsService";
import assignmentsActions from "../actions/AssignmentsActions";
import {connect} from "react-redux";
import Assignment from "./assignments/Assignment";


class RecipeDetailsComponent extends React.Component {

  state = {
    recipeData: ''
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.retrieveRecipe();
    if (this.props.user.id) {
      this.props.findAssignmentByAssigneeUserId(this.props.user.id);
    } else {
      this.props.findUser();
        this.setState({guestUser: true})
    }

  }


  retrieveRecipe() {
    const recipeId = this.props.recipeId;
    console.log('querying', recipeId);
    fetch(
        "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeId + "/information",
        {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "4cb3ca57e6msh641ab0b4d2376ecp1f48f6jsna9a5d36c8e28"
          }
        })
    .then(response => response.json()) // Getting the actual response data
    .then(data => {
      this.setState({
        recipeData: data
      });
      console.log('this', this)
      return data;
    })
    .catch(err => {
      console.log(err);
    });

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.recipeId !== this.props.recipeId) {
      this.retrieveRecipe();
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
          <div class="title-area d-flex align-items-center justify-content-between p-3 border rounded bg-white mb-3">
          <h1>Recipe Details</h1>
            <button type="button" className="btn btn-primary" onClick={this.props.history.goBack}>Back</button>
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
              {!this.state.guestUser && this.props.assignments &&
              <div className="col-md-5 col-12">
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
