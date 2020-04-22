import { CREATE_REVIEW, FIND_ALL_REVIEWS, DELETE_REVIEW, FIND_ALL_REVIEWS_BY_USERID,  FIND_ALL_REVIEWS_FOR_FOODID} from "../common/ReviewsConstants";

import _ from 'lodash';

const initialState = {
  allReviews: [],
  userReviews: [],
  foodReviews: []
}

const reviewsReducer = (state = initialState, action) => {
  let allReviews, userReviews, foodReviews;
  switch (action.type) {

    case CREATE_REVIEW:
      allReviews = [...state.allReviews];
      foodReviews = [...state.foodReviews];

      allReviews.push(action.review);
      foodReviews.push(action.review);

      return {
        allReviews: allReviews,
        foodReviews: foodReviews
      }

    case FIND_ALL_REVIEWS_BY_USERID:
      userReviews = _.sortBy(action.userReviews, 'date')
      return {
        userReviews: userReviews
      }

    case FIND_ALL_REVIEWS_FOR_FOODID:
      foodReviews = _.sortBy(action.foodReviews, 'date')
      return {
        foodReviews: foodReviews
      }

    case FIND_ALL_REVIEWS:
      allReviews = _.sortBy(action.allReviews, 'date')
      return {
        allReviews: allReviews
      }

    case DELETE_REVIEW:
      allReviews = [...state.allReviews];
      userReviews = [...state.userReviews];
      foodReviews = [...state.foodReviews];

      _.remove(allReviews, {id: action.reviewId})
      _.remove(userReviews, {id: action.reviewId})
      _.remove(foodReviews, {id: action.reviewId})


      return {
        allReviews: allReviews,
        userReviews: userReviews,
        foodReviews: foodReviews
      }

    default:
      return state
  }
}

export default reviewsReducer;

