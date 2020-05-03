import React from "react";
import {Link} from "react-router-dom";

function reviewIconClass(rating) {
  switch (rating) {
    case 5:
      return 'five-star';
    case 4:
      return 'four-star';
    case 3:
      return 'three-star';
    case 2:
      return 'two-star';
    case 1:
      return 'one-star';
    default:
      return 'no-star';
  }
}


const Review = ({ alignHorizontal, linkToRecipe, review, hideForm, updateReview, deleteReview }) => {

  return (
      <li className={alignHorizontal ? "border-0 list-group-item mb-2 col-lg-4 col " : "p-0 list-group-item mt-2"}>
        {!hideForm && <span className="float-right btn" onClick={deleteReview}><i className="fa fa-close text-danger"></i></span>}
        {linkToRecipe &&
        <h5 className="card-title"><Link className="text-info" to={`/recipe/${review.recipeId}`}>{review.recipeName}</Link></h5> }
         <span className={reviewIconClass(review.rating)}></span>
          <blockquote className="blockquote mb-0">
            <p className="mb-2">"{review.text}"</p>
            <footer className="blockquote-footer"><Link className="text-info" to={`/profile/${review.username}`}>{review.username}</Link></footer>
          </blockquote>
      </li>

  );

}

export default Review;
