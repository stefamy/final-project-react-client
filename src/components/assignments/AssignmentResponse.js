import React from "react";
import {Link} from "react-router-dom";

class AssignmentResponse extends React.Component {

  state = {
    updatedAssignment: {...this.props.assignment}
  }

  handleResponseChange(status) {
    let newState = Object.assign({}, this.state);
    if (status === "Assigned") {
      newState.updatedAssignment.status = "Assigned";
      newState.updatedAssignment.assigneeUserId = this.props.user.id;
      newState.updatedAssignment.assigneeFirstName = this.props.user.firstName;
      newState.updatedAssignment.assigneeLastName = this.props.user.lastName;
      newState.updatedAssignment.assigneeEmail = this.props.user.email;
      newState.updatedAssignment.dateOfResponse = new Date();
      newState.updatedAssignment.assigneeComments = "";
    } else {
      newState.updatedAssignment.status = "Unassigned";
      newState.updatedAssignment.assigneeUserId = "";
      newState.updatedAssignment.assigneeFirstName = "";
      newState.updatedAssignment.assigneeLastName = "";
      newState.updatedAssignment.assigneeEmail = "";
      newState.updatedAssignment.dateOfResponse = "";
      newState.updatedAssignment.assigneeComments = "";
      newState.updatedAssignment.glutenFree = 0;
      newState.updatedAssignment.vegan = 0;
      newState.updatedAssignment.vegetarian = 0;
      newState.updatedAssignment.nutFree = 0;
      newState.updatedAssignment.otherDietaryNotes = "";
      newState.updatedAssignment.recipeLink = "";
    }
    this.setState(newState);
  }

  handleAssignmentInput(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.updatedAssignment[attribute] = newContent;
    this.setState(newState);
  }

  handleUpdateAssignment(e) {
    e.preventDefault();
    this.props.updateAssignment(this.state.updatedAssignment.id, this.state.updatedAssignment)
    this.setState({isEditingAssignment: false})
  }

  handleDeleteAssignment(e) {
    e.preventDefault();
    this.props.deleteAssignment(this.state.updatedAssignment.id);
  }

  handleNewDishCategory(e) {
    this.handleAssignmentInput('dishCat', e.target.value);
  }

  editAssignment(e) {
    e.preventDefault();
    this.setState({
      isEditingAssignment: true
    })
  }

  render() {
    const assignment = this.props.assignment;
    const user = this.props.user;


    return (
        <div className="assignment border mb-3">
          <div className="assignment-header d-flex justify-content-between align-items-center pl-3 pr-3 pt-2 pb-2 bg-light border-bottom">
            <div>{assignment.type || 'Task'} {assignment.type === "Food/Drink" &&
                  <span className="pl-3 pr-3">
                    {this.state.updatedAssignment.vegan === 1 && <span className="badge badge-pill badge-info ml-1 mr-1">Vegan</span> }
                    {this.state.updatedAssignment.vegetarian === 1 && <span className="badge badge-pill badge-info ml-1 mr-1">Vegetarian</span> }
                    {this.state.updatedAssignment.glutenFree === 1 && <span className="badge badge-pill badge-info ml-1 mr-1">Gluten Free</span> }
                    {this.state.updatedAssignment.nutFree === 1 && <span className="badge badge-pill badge-info ml-1 mr-1">Nut Free</span> }
                  </span>
             }
            </div>
            {this.props.isHost && <button className="btn" onClick={(e) => this.handleDeleteAssignment(e)}><i className="text-danger fa fa-close"></i></button>}
          </div>
          <div className="assignment-body d-flex">
          <div className="col-auto pl-0 pr-0 input-group-addon bg-light assignment-checkbox-wrap border-right">
            <label className="special-checkbox pl-3 pr-3 pt-2 pb-2">
              <input
                  disabled={assignment.status === "Assigned" && assignment.assigneeUserId !== user.id}
                  onChange={(e) => this.handleResponseChange(e.target.checked ? "Assigned" : "Unassigned")}
                  id={`assignmentCheckboxInput` + assignment.id}
                  type="checkbox"
                  checked={this.state.updatedAssignment.status === "Assigned" ? 1 : 0}
                  name="assignmentCheckbox"/>
            </label>
          </div>
          <div className="col d-flex justify-content-between align-items-center border-0">
            <div className="pt-3 pb-3">
              <div><h5 className="mb-1">{assignment.title}</h5></div>
              <div>{assignment.description}</div>
              {assignment.type === 'Food/Drink' && assignment.status === 'Assigned' && assignment.recipeLink && <div><Link to={assignment.recipeLink} className="text-info">Link to recipe<i className="ml-2 fa fa-link"></i></Link></div>}
            </div>
            {(this.state.updatedAssignment.status === assignment.status) && <>
              {(assignment.status === "Assigned" && assignment.assigneeUserId !== user.id) &&
                <span className="badge badge-pill badge-light text-secondary border">{this.state.updatedAssignment.status}</span> }
              {(assignment.status === "Assigned" && assignment.assigneeUserId === user.id) &&
                <span className="btn badge badge-pill badge-success" onClick={(e) => this.editAssignment(e)}>{this.state.updatedAssignment.status} to you</span> }
              {assignment.status !== "Assigned" && <span className="badge badge-pill badge-warning">{this.state.updatedAssignment.status}</span>}
             </>}
          </div>
        </div>
          {assignment.status === "Assigned" && this.props.isHost &&
          <div className="col d-flex align-items-center justify-content-between border-top">
            <div className="pt-3 pb-3">Assigned to: {assignment.assigneeFirstName} {assignment.assigneeLastName}</div>
            <div className="pt-3 pb-3"> Notes from assignee: {assignment.assigneeComments || "None provided"}</div>
          </div>
          }
          {(this.state.updatedAssignment.status !== assignment.status || this.state.isEditingAssignment) && <>
            <div className="col pl-0 pr-0 input-group border-top">
            {(this.state.updatedAssignment.type === "Food/Drink") &&
              <div className="col-12 pt-3 border-bottom">
              <div className="form-group">
                <label htmlFor="foodCategoryInput">Type Of Dish</label>
                <select defaultValue={assignment.dishCat || ""} className="form-control"
                        id="foodCategoryInput"
                        onChange={this.handleNewDishCategory.bind(this)}>
                  <option value="" disabled>Dish Category</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Main">Main</option>
                  <option value="Snack">Snack</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Starch">Starch</option>
                  <option value="Side">Side</option>
                  <option value="Meat">Meat</option>
                  <option value="Beverage">Beverage</option>
                  <option value="Any/No Preference">Any/Other</option>
                </select>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <label className="form-check-label" htmlFor="glutenFreeInput">
                    <input
                        defaultChecked={assignment.glutenFree}
                        type="checkbox"
                        id="glutenFreeInput"
                        onChange={(e) => this.handleAssignmentInput(
                            'glutenFree', e.target.checked ? 1 : 0)}
                        className="form-check-input"
                    />Gluten Free</label>
                </div>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="vegetarianInput">
                    <input
                        defaultChecked={assignment.vegetarian}
                        type="checkbox"
                        id="vegetarianInput"
                        onChange={(e) => this.handleAssignmentInput(
                            'vegetarian', e.target.checked ? 1 : 0)}
                        className="form-check-input"
                    />
                    Vegetarian</label>
                </div>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="veganInput">
                    <input
                        defaultChecked={assignment.vegan}
                        type="checkbox"
                        id="veganInput"
                        onChange={(e) => this.handleAssignmentInput('vegan',
                            e.target.checked ? 1 : 0)}
                        className="form-check-input"
                    />
                    Vegan</label>
                </div>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="nutFreeInput">
                    <input
                        defaultChecked={assignment.nutFree}
                        type="checkbox"
                        id="nutFreeInput"
                        onChange={(e) => this.handleAssignmentInput('nutFree',
                            e.target.checked ? 1 : 0)}
                        className="form-check-input"
                    />
                    Nut Allergy</label>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="otherDietaryNotes">Other Dietary Notes</label>
                <input
                    id="otherDietaryNotes"
                    onChange={(e) => this.handleAssignmentInput(
                        'otherDietaryNotes', e.target.value)}
                    className={`form-control`}
                    placeholder='Example: Something with low-sugar content'
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipeLinkInput">Recipe Link</label>
                <input
                    id="recipeLinkInput"
                    onChange={(e) => this.handleAssignmentInput('recipeLink',
                        e.target.value)}
                    className={`form-control`}
                    placeholder='Example: https://www.kingarthurflour.com/recipes/cornbread-recipe'
                />
              </div>

            </div>
            }
              <input id={`assigneeCommentsInput` + assignment.id}
                     name="assigneeComments"
                     type="text"
                     className="form-control border-0"
                     placeholder="Comments for event organizer"
                     onChange={(e) => this.handleAssignmentInput(
                         'assigneeComments', e.target.value)}
              />
              <div className="input-group-addon border-left bg-light">
                <button type="submit"
                        onClick={(e) => this.handleUpdateAssignment(e)}
                        className="btn btn-info special-border-radius">Save
                </button>

            </div>
            </div>
          </>
          }

        </div>
    );
  }

}

export default AssignmentResponse;
