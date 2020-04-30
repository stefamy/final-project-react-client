import React from "react";

class TaskResponse extends React.Component {

  state = {
    updatedTask: {...this.props.task}
  }

  handleResponseChange(status) {
    let newState = Object.assign({}, this.state);
    if (status === "Assigned") {
      newState.updatedTask.status = "Assigned";
      newState.updatedTask.assigneeUserId = this.props.user.id;
      newState.updatedTask.assigneeFirstName = this.props.user.firstName;
      newState.updatedTask.assigneeLastName = this.props.user.lastName;
      newState.updatedTask.assigneeEmail = this.props.user.email;
      newState.updatedTask.dateOfResponse = new Date();
      newState.updatedTask.assigneeComments = "";
    } else {
      newState.updatedTask.status = "Unassigned";
      newState.updatedTask.assigneeUserId = "";
      newState.updatedTask.assigneeFirstName = "";
      newState.updatedTask.assigneeLastName = "";
      newState.updatedTask.assigneeEmail = "";
      newState.updatedTask.dateOfResponse = "";
      newState.updatedTask.assigneeComments = "";
      newState.updatedTask.glutenFree = 0;
      newState.updatedTask.vegan = 0;
      newState.updatedTask.vegetarian = 0;
      newState.updatedTask.nutFree = 0;
      newState.updatedTask.otherDietaryNotes = "";
      newState.updatedTask.recipeLink = "";
    }
    this.setState(newState);
  }

  handleTaskInput(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.updatedTask[attribute] = newContent;
    this.setState(newState);
  }

  handleUpdateTask(e) {
    e.preventDefault();
    this.props.updateTask(this.state.updatedTask.id, this.state.updatedTask)
    this.setState({isEditingTask: false})
  }

  handleDeleteTask(e) {
    e.preventDefault();
    this.props.deleteTask(this.state.updatedTask.id);
  }

  handleNewDishCategory(e) {
    this.handleTaskInput('dishCat', e.target.value);
  }

  editTask(e) {
    e.preventDefault();
    this.setState({
      isEditingTask: true
    })
  }

  render() {
    const task = this.props.task;
    const user = this.props.user;


    return (
        <div className="task border mb-3">
          <div className="task-header d-flex justify-content-between align-items-center pl-3 pr-3 pt-2 pb-2 bg-light border-bottom">
            <div>{task.type || 'Task'} {task.type === "Food/Drink" &&
                  <span className="pl-3 pr-3">
                    {this.state.updatedTask.vegan === 1 && <span className="badge badge-pill badge-info ml-1 mr-1">Vegan</span> }
                    {this.state.updatedTask.vegetarian === 1 && <span className="badge badge-pill badge-info ml-1 mr-1">Vegetarian</span> }
                    {this.state.updatedTask.glutenFree === 1 && <span className="badge badge-pill badge-info ml-1 mr-1">Gluten Free</span> }
                    {this.state.updatedTask.nutFree === 1 && <span className="badge badge-pill badge-info ml-1 mr-1">Nut Free</span> }
                  </span>
             }
            </div>
            {this.props.isHost && <button className="btn" onClick={(e) => this.handleDeleteTask(e)}><i className="text-danger fa fa-close"></i></button>}
          </div>
          <div className="task-body d-flex">
          <div className="col-auto pl-0 pr-0 input-group-addon bg-light task-checkbox-wrap border-right">
            <label className="special-checkbox pl-3 pr-3 pt-2 pb-2">
              <input
                  disabled={task.status === "Assigned" && task.assigneeUserId !== user.id}
                  onChange={(e) => this.handleResponseChange(e.target.checked ? "Assigned" : "Unassigned")}
                  id={`taskCheckboxInput` + task.id}
                  type="checkbox"
                  checked={this.state.updatedTask.status === "Assigned" ? 1 : 0}
                  name="taskCheckbox"/>
            </label>
          </div>
          <div className="col d-flex justify-content-between align-items-center border-0">
            <div className="pt-3 pb-3">
              <div><h5 className="mb-1">{task.title}</h5></div>
              <div>{task.description}</div>
              {task.type === 'Food/Drink' && task.status === 'Assigned' && task.recipeLink && <div><a href={`${task.recipeLink}`} className="text-info">Link to recipe<i className="ml-2 fa fa-link"></i></a></div>}
            </div>
            {(this.state.updatedTask.status === task.status) && <>
              {(task.status === "Assigned" && task.assigneeUserId !== user.id) &&
                <span className="badge badge-pill badge-light text-secondary border">{this.state.updatedTask.status}</span> }
              {(task.status === "Assigned" && task.assigneeUserId === user.id) &&
                <span className="btn badge badge-pill badge-success" onClick={(e) => this.editTask(e)}>{this.state.updatedTask.status} to you</span> }
              {task.status !== "Assigned" && <span className="badge badge-pill badge-warning">{this.state.updatedTask.status}</span>}
             </>}
          </div>
        </div>
          {task.status === "Assigned" && this.props.isHost &&
          <div className="col d-flex align-items-center justify-content-between border-top">
            <div className="pt-3 pb-3">Assigned to: {task.assigneeFirstName} {task.assigneeLastName}</div>
            <div className="pt-3 pb-3"> Notes from assignee: {task.assigneeComments || "None provided"}</div>
          </div>
          }
          {(this.state.updatedTask.status !== task.status || this.state.isEditingTask) && <>
            <div className="col pl-0 pr-0 input-group border-top">
            {(this.state.updatedTask.type === "Food/Drink") &&
              <div className="col-12 pt-3 border-bottom">
              <div className="form-group">
                <label htmlFor="foodCategoryInput">Type Of Dish</label>
                <select defaultValue={task.dishCat || ""} className="form-control"
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
                        defaultChecked={task.glutenFree}
                        type="checkbox"
                        id="glutenFreeInput"
                        onChange={(e) => this.handleTaskInput(
                            'glutenFree', e.target.checked ? 1 : 0)}
                        className="form-check-input"
                    />Gluten Free</label>
                </div>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="vegetarianInput">
                    <input
                        defaultChecked={task.vegetarian}
                        type="checkbox"
                        id="vegetarianInput"
                        onChange={(e) => this.handleTaskInput(
                            'vegetarian', e.target.checked ? 1 : 0)}
                        className="form-check-input"
                    />
                    Vegetarian</label>
                </div>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="veganInput">
                    <input
                        defaultChecked={task.vegan}
                        type="checkbox"
                        id="veganInput"
                        onChange={(e) => this.handleTaskInput('vegan',
                            e.target.checked ? 1 : 0)}
                        className="form-check-input"
                    />
                    Vegan</label>
                </div>
                <div className="form-check">
                  <label className="form-check-label" htmlFor="nutFreeInput">
                    <input
                        defaultChecked={task.nutFree}
                        type="checkbox"
                        id="nutFreeInput"
                        onChange={(e) => this.handleTaskInput('nutFree',
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
                    onChange={(e) => this.handleTaskInput(
                        'otherDietaryNotes', e.target.value)}
                    className={`form-control`}
                    placeholder='Example: Something with low-sugar content'
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipeLinkInput">Recipe Link</label>
                <input
                    id="recipeLinkInput"
                    onChange={(e) => this.handleTaskInput('recipeLink',
                        e.target.value)}
                    className={`form-control`}
                    placeholder='Example: https://www.kingarthurflour.com/recipes/cornbread-recipe'
                />
              </div>

            </div>
            }
              <input id={`assigneeCommentsInput` + task.id}
                     name="assigneeComments"
                     type="text"
                     className="form-control border-0"
                     placeholder="Comments for event organizer"
                     onChange={(e) => this.handleTaskInput(
                         'assigneeComments', e.target.value)}
              />
              <div className="input-group-addon border-left bg-light">
                <button type="submit"
                        onClick={(e) => this.handleUpdateTask(e)}
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

export default TaskResponse;
