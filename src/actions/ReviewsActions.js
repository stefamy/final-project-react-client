import { CREATE_REVIEW, FIND_ALL_REVIEWS, DELETE_REVIEW, FIND_ALL_REVIEWS_BY_USERID,  FIND_ALL_REVIEWS_FOR_FOODID} from "../common/ReviewsConstants";


// CREATE
export const createReview = (review) => ({
  type: CREATE_REVIEW,
  review: review
})

// READ
export const findAllReviews = (allReviews) => ({
  type: FIND_ALL_REVIEWS,
  allReviews: allReviews
})


// READ
export const findAllReviewsForFoodId = (foodReviews) => ({
  type: FIND_ALL_REVIEWS_FOR_FOODID,
  foodReviews: foodReviews
})



// READ
export const findAllReviewsByUserId = (userReviews) => ({
  type: FIND_ALL_REVIEWS_BY_USERID,
  userReviews: userReviews
})




// DELETE
export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId: reviewId
})


export default {
  createReview,
  findAllReviews,
  findAllReviewsForFoodId,
  findAllReviewsByUserId,
  deleteReview
}
