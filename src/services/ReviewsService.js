import {API_URL} from '../common/ApiConstants';

// CREATE
export const createReview = (recipeId, review) =>
    fetch(`${API_URL}/api/recipes/${recipeId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json());

// READ
export const findAllReviewsForFoodId = (foodId) =>
    fetch(`${API_URL}/api/recipes/${foodId}/reviews`, {
      method: 'GET',
    })
    .then( res => res.json());

// READ
export const findAllReviewsByUserId = (userId) =>
    fetch(`${API_URL}/api/user/${userId}/reviews`, {
      method: 'GET',
    })
    .then( res => res.json());


// READ (first 10 entries)
export const findAllReviews = () =>
    fetch(`${API_URL}/api/reviews`, {
      method: 'GET'
    }).then(response => response.json());


// UPDATE
export const updateReview = (reviewId, review) =>
    fetch(`${API_URL}/api/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify(review),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())


// DELETE
export const deleteReview = (reviewId) =>
    fetch(`http://localhost:8080/api/reviews/${reviewId}`, {
      method: 'DELETE'
    }).then(response => response.json());



export default {
  createReview,
  findAllReviewsForFoodId,
  findAllReviewsByUserId,
  findAllReviews,
  updateReview,
  deleteReview
}
