import React, {Component} from "react";
import {TASK_TYPES} from "../../common/TasksConstants"

export default class TaskEditor extends Component {


  state = {
    updatedTask: { }
  }

  componentDidMount() {
    if (this.props.task) {
      this.setState({
        updatedTask: {...this.props.task}
      })
    }
  }

  handleTaskInput(attribute, newContent) {
    let newState = Object.assign({}, this.state);
    newState.updatedTask[attribute] = newContent;
    this.setState(newState);
  }

  handleNewDishCategory(e) {
    this.handleTaskInput('dishCat', e.target.value);
  }

  submit(e) {
    e.preventDefault();
    this.props.submitHandler(this.props.submitId, this.state.updatedTask);
    this.props.toggleEditor();
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
    const task = this.props.task;
    const user = this.props.user;

    return (
        <div className="task-form p-4 bg-light rounded border">
          <div className="row align-items-between justify-content-between mb-2 pb-2">
            <div className="col-auto"><h5>{this.props.headerText}</h5></div>
            <div className="col-auto">
              <button onClick={this.props.toggleEditor} className="btn btn-sm border-pink bg-pink">Cancel</button>
            </div>
          </div>

          <form onSubmit={(e) => this.submit(e)}>

            <div className="d-flex row align-items-center justify-content-between">
              {(this.state.updatedTask.type === TASK_TYPES.FOOD) &&
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
            </div>
            <div className="row mt-3">
              <div className="col">
                <input id={`assigneeCommentsInput` + task.id}
                       name="assigneeComments"
                       type="text"
                       className="form-control"
                       placeholder="Comments (displayed publicly)"
                       onChange={(e) => this.handleTaskInput(
                           'assigneeComments', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group mt-3 mb-0">
              {!this.state.isSaving && !this.state.showSuccess && <button type="submit" className="btn btn-info">Save Task</button> }
              {this.state.isSaving && !this.state.showSuccess && <button type="submit" disabled className="btn btn-info">Save Task</button> }
              {this.state.showSuccess && <span className="text-success success-saved">Saved!</span> }
            </div>
          </form>
        </div>
    );
  }
}

