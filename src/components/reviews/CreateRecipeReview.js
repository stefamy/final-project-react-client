import React, {Component} from "react";

export default class CreateRecipeReview extends Component {


  state = {
    newReview: {
      recipeId: this.props.recipeId,
      recipeName: this.props.recipeName,
      username: this.props.username,
      userId: this.props.userId,
      date: new Date(),
      rating: '',
      text: '',
    }
  }

  handleNewReviewInput(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.newReview[attribute] = newContent;
    this.setState(newState);
  }

  handleNewStarAssignment(e) {
    this.handleNewReviewInput('rating', e.target.value);
  }


  handleCreateReview(e) {
    e.preventDefault();
    this.props.createReview(this.state.newReview.recipeId, this.state.newReview);
    this.setState({
      newReview: {
        recipeId: this.props.recipeId,
        recipeName: this.props.recipeName,
        username: this.props.userId,
        userId: this.props.userId,
        date: new Date(),
        rating: '',
        text: '',
      }
    })
  }

  showSaveSuccess() {
    this.setState({
      isSaving: false,
      showSuccess: true
    });
    return setTimeout(() => {
      this.setState({showSuccess: false})
    }, 1000);
  }

  render() {
    return (
        <div className="new-review-form bg-light mt-5 p-3">
          <h5 className="mt-1">Write New Review</h5>
          <form onSubmit={(e) => this.handleCreateReview(e)}>
            <div className="form-group">
              <div className="form-group">
                <label htmlFor="recipeRatingInput">Recipe Star Rating (out of 5)</label>
                <select defaultValue="" className="form-control"
                        id="recipeRatingInput"
                        onChange={this.handleNewStarAssignment.bind(this)}>
                  <option value="" disabled>Number of stars</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="reviewText">Review</label>
              <input
                  id="reviewText"
                  onChange={(e) => this.handleNewReviewInput('text', e.target.value)}
                  className="form-control"
                  placeholder='Example: "Scrumptious! Would make again."'
                  required
              />
            </div>

            <div className="form-group mt-3">
              {!this.state.isSaving && !this.state.showSuccess && <button type="submit" className="btn btn-info">Save Review</button> }
              {this.state.isSaving && !this.state.showSuccess && <button type="submit" disabled className="btn btn-info">Save Review</button> }
              {this.state.showSuccess && !this.state.isSaving && <span className="text-success success-saved"> Saved!</span> }
            </div>
          </form>
        </div>
    );
  }
}
