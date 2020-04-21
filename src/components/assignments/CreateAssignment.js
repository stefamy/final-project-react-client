import React, {Component} from "react";


export default class CreateAssignment extends Component {


  state = {
    newAssignment: {
      eventId: this.props.eventId,
      status: "Unassigned"
    }
  }

  handleNewAssignmentInput(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.newAssignment[attribute] = newContent;
    this.setState(newState);
  }

  handleNewTaskType(e) {
    this.handleNewAssignmentInput('type', e.target.value);
  }

  handleNewDishCategory(e) {
    this.handleNewAssignmentInput('dishCat', e.target.value);
  }

  handleCreateAssignment(e) {
      e.preventDefault();
      this.props.createAssignment(this.state.newAssignment.eventId, this.state.newAssignment);
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
        <div className="new-assignment-form mt-5 mb-5">
          <h3>Create New Assignment</h3>
          <form onSubmit={(e) => this.handleCreateAssignment(e)}>
              <div className="form-group">
                <label htmlFor="taskNameInput">Assignment Name</label>
                <input
                    id="taskNameInput"
                    onChange={(e) => this.handleNewAssignmentInput('title', e.target.value)}
                    className={`form-control`}
                    placeholder='Example: "Cold Appetizer Item"'
                    required/>
              </div>
            <div className="form-group">
              <label htmlFor="taskDescriptionInput">Description</label>
                <input
                    id="taskDescriptionInput"
                    onChange={(e) => this.handleNewAssignmentInput('description', e.target.value)}
                    className='form-control'
                    placeholder='Example: "Something easy to eat standing up, preferably!"'
                    />
            </div>
            <div className="form-group">
              <label htmlFor="taskTypeInput">Type Of Assignment</label>
                <select id="taskTypeInput" defaultValue="" className="form-control" value={this.state.value} onChange={this.handleNewTaskType.bind(this)}>
                  <option value="" disabled>Type of Assignment</option>
                  <option value="FOOD">Food</option>
                  <option value="PREP">Event Prep</option>
                  <option value="SETUP">Set up (Day of)</option>
                  <option value="CLEANUP">Clean up (Day of)</option>
                  <option value="OTHER">Other</option>
                </select>
            </div>
            {this.state.newAssignment.type === "PREP" && <>
            <div className="form-input">
              <label htmlFor="assignmentDateInput">Date Needed By</label>
              <input
                  id="assignmentDateInput"
                  type="date"
                  min="2020-01-01"
                  max="2040-01-01"
                  onChange={(e) => this.handleNewAssignmentInput('dueDate', e.target.value)}
                  className="form-control"
                  />
              </div>
            </>}
            {this.state.newAssignment.type === "FOOD" && <>
            <div className="form-group">
            <label htmlFor="foodCategoryInput">Type Of Dish</label>
                <select value={this.state.value} className="form-control" id="foodCategoryInput" onChange={this.handleNewDishCategory.bind(this)}>
                  <option value="BREAKFAST">Breakfast</option>
                  <option value="LUNCH">Lunch</option>
                  <option value="MAIN">Main</option>
                  <option value="SNACK">Snack</option>
                  <option value="DESSERT">Dessert</option>
                  <option value="STARCH">Starch</option>
                  <option value="SIDE">Side</option>
                  <option value="MEAT">Meat</option>
                  <option value="BEVERAGE">Beverage</option>
                  <option value="ANY">Any/No Preference</option>
                </select>
            </div>
            <div className="form-group">
              <div className="form-check">
                    <label className="form-check-label" htmlFor="glutenFreeInput">
                    <input
                        type="checkbox"
                        id="glutenFreeInput"
                        onChange={(e) => this.handleNewAssignmentInput('glutenFree',e.target.checked ? 1 : 0)}
                        className="form-check-input"
                    />
                      Gluten Free</label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="vegetarianInput">
                    <input
                        type="checkbox"
                        id="vegetarianInput"
                        onChange={(e) => this.handleNewAssignmentInput('vegetarian', e.target.checked ? 1 : 0)}
                        className="form-check-input"
                    />
                      Vegetarian</label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="veganInput">
                    <input
                        type="checkbox"
                        id="veganInput"
                        onChange={(e) => this.handleNewAssignmentInput('vegan', e.target.checked ? 1 : 0)}
                        className="form-check-input"
                    />
                      Vegan</label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="nutAllergyInput">
                    <input
                        type="checkbox"
                        id="nutAllergyInput"
                        onChange={(e) => this.handleNewAssignmentInput('nutAllergy', e.target.checked ? 1 : 0)}
                        className="form-check-input"
                    />
                      Nut Allergy</label>
                  </div>
              </div>
                <div className="form-group">
                  <label htmlFor="otherDietaryInput">Other Dietary Restrictions</label>
                  <input
                      id="otherDietaryInput"
                      onChange={(e) => this.handleNewAssignmentInput('otherDietaryRestrictions', e.target.value)}
                      className={`form-control`}
                      placeholder='Example: Something with low-sugar content'
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipeLinkInput">Recipe Link</label>
                  <input
                      id="recipeLinkInput"
                      onChange={(e) => this.handleNewAssignmentInput('recipeLink', e.target.value)}
                      className={`form-control`}
                      placeholder='Example: https://www.kingarthurflour.com/recipes/cornbread-recipe'
                  />
                </div>
              </>}

            <div className="form-group mt-3">
              {!this.state.isSaving && <button type="submit" className="btn btn-primary">Add Assignment</button> }
              {this.state.showSuccess && <span className="text-success success-saved"> Updated!</span> }
              {this.state.isSaving && <button type="submit" disabled className="btn btn-primary">Update Response</button> }
            </div>
          </form>
        </div>
    );
  }
}

