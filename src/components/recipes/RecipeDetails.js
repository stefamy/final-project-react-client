import React from "react";
import RecipeCard from './RecipeCard';
import userService from "../../services/UserService";
import userActions from "../../actions/UserActions";
import tasksService from "../../services/TasksService";
import tasksActions from "../../actions/TasksActions";
import {connect} from "react-redux";
import SearchBar from "../../search/SearchBar";
import {Link} from "react-router-dom";
import {retrieveRecipe} from "../../services/RecipeService";
import RecipeReviewsList from "../reviews/RecipeReviewsList";

class RecipeDetails extends React.Component {

  state = {
    recipeData: ''
  };

  componentDidMount() {
    this.handleRetrieveRecipe();
    if (this.props.user.id) {
      this.props.findTaskByAssigneeUserId(this.props.user.id);
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
      this.props.findTaskByAssigneeUserId(this.props.user.id);
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
                <SearchBar
                  history={this.props.history}/>
                </div>

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
    tasks: state.tasks.tasks
  };
};


const dispatchToPropertyMapper = dispatch => {
  return {
    findUser: () => {
      userService.findUser()
      .then(user => dispatch(userActions.findUser(user)));
    },
    updateTask: (taskId, task) => {
      tasksService.updateTask(taskId, task).then(task => {
        dispatch(tasksActions.updateTask(task));
      });
    },
    findTaskByAssigneeUserId: userId => {
      tasksService.findTaskByAssigneeUserId(userId).then(tasks => {
        dispatch(tasksActions.findAllTasks(tasks));
      });
    }
  };
};


export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(RecipeDetails);
