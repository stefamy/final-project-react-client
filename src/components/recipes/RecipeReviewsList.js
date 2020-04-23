import React, { Component } from "react";
import userService from "../../services/UserService";
import userActions from "../../actions/UserActions";
import {connect} from "react-redux";
import reviewsService from "../../services/ReviewsService";
import reviewsActions from "../../actions/ReviewsActions";
import Review from "./Review";
import CreateRecipeReview from "./CreateRecipeReview";

class RecipeReviewsList extends Component {

  componentDidMount() {
    if (this.props.recipeId) {
      this.props.findAllReviewsForFoodId(this.props.recipeId);
    }
    if (this.props.userId) {
      this.props.findAllReviewsByUserId(this.props.userId);
    }
    if (this.props.findRecent) {
      this.props.findAllReviews(this.props.limit);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.userId !== this.props.userId) {
      this.props.findAllReviewsByUserId(this.props.userId);
    }
    if (prevProps.recipeId !== this.props.recipeId) {
      this.props.findAllReviewsForFoodId(this.props.recipeId);
    }
  }

  render() {
    return (
        <div className={this.props.wrapClass}>
          {this.props.showCreateReview && <h2>Reviews</h2>}
          <ul className="list-group list-group-flush">
            {this.props.foodReviews &&
              this.props.foodReviews.map((review, index) => (
                  <Review
                      key={index}
                      review={review}
                      history={this.props.history}
                      hideForm={this.props.hideForm || this.props.user.id !== review.userId}
                      deleteReview={() => this.props.deleteReview(review.id)}
                  />
              ))
            }
            {(this.props.recipeId && (!this.props.foodReviews || !this.props.foodReviews.length)) &&
              <li className="list-group-item">There are no reviews for this recipe yet.</li>
            }
        </ul>
          {this.props.user && this.props.user.id && this.props.showCreateReview &&
          <CreateRecipeReview
              history={this.props.history}
              userId={this.props.user.id}
              username={this.props.user.username}
              recipeId={this.props.recipeId}
              createReview={this.props.createReview}
              recipeName={this.props.recipeName}
          />
          }
          {this.props.userReviews &&
          <ul className="list-group list-group-flush">
            {this.props.userReviews.map((review, index) => (
                <Review
                    key={index}
                    review={review}
                    history={this.props.history}
                    hideForm={this.props.hideForm || this.props.user.id !== review.userId}
                    updateReview={() => this.props.updateReview()}
                    linkToRecipe={this.props.linkToRecipe}
                />
            ))
            }
            {this.props.userReviews && this.props.userReviews.length === 0 &&
            <li className="list-group-item">This user has not created any reviews.</li> }
          </ul>
          }
          {this.props.allReviews &&
          <ul className={this.props.alignHorizontal ? "list-group border-0 flex-row justify-content-around" : "list-group list-group-flush"}>
            {this.props.allReviews.map((review, index) =>
                (index <= this.props.limit) ?
                <Review
                    key={index}
                    review={review}
                    history={this.props.history}
                    hideForm={this.props.hideForm || this.props.user.id
                    !== review.userId}
                    linkToRecipe={this.props.linkToRecipe}
                    alignHorizontal={this.props.alignHorizontal}
                /> : '' )
              }

          </ul>
          }
          </div>
      )
    }

}

const stateToPropertyMapper = state => {
  return {
    user: state.user.user,
    assignments: state.assignments.assignments,
    foodReviews: state.reviews.foodReviews,
    userReviews: state.reviews.userReviews,
    allReviews: state.reviews.allReviews
  };
};

const dispatchToPropertyMapper = dispatch => {
  return {
    findUser: () => {
      userService.findUser()
      .then(user => dispatch(userActions.findUser(user)));
    },
    findAllReviews: (limit) => {
      reviewsService.findAllReviews(limit).then(reviews => {
        dispatch(reviewsActions.findAllReviews(reviews));
      });
    },
    findAllReviewsByUserId: userId => {
      reviewsService.findAllReviewsByUserId(userId).then(reviews => {
        dispatch(reviewsActions.findAllReviewsByUserId(reviews));
      });
    },
    deleteReview: (reviewId) => {
      reviewsService.deleteReview(reviewId)
      .then(res => dispatch(reviewsActions.deleteReview(reviewId)));
    },
    createReview: (recipeId, review) => {
      reviewsService.createReview(recipeId, review)
      .then(review => dispatch(reviewsActions.createReview(review)));
    },
    findAllReviewsForFoodId: foodId => {
      reviewsService.findAllReviewsForFoodId(foodId).then(reviews => {
        dispatch(reviewsActions.findAllReviewsForFoodId(reviews));
      });
    }
  };
};


export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(RecipeReviewsList);
