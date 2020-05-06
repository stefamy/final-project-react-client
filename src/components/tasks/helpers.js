import React from "react";
import {TASK_STATUS} from "../../common/TasksConstants";

export const assignResponses = (task, profile) => {
    task.status = TASK_STATUS.ASSIGNED;
    task.assigneeUserId = profile.id;
    task.assigneeFirstName = profile.firstName;
    task.assigneeLastName = profile.lastName;
    task.assigneeEmail = profile.email;
    task.dateOfResponse = new Date();
    task.assigneeComments = "";

    return task;
}

export const clearResponses = (task) => {
  task.status = TASK_STATUS.UNASSIGNED;
  task.assigneeUserId = "";
  task.assigneeFirstName = "";
  task.assigneeLastName = "";
  task.assigneeEmail = "";
  task.dateOfResponse = "";
  task.assigneeComments = "";
  task.glutenFree = 0;
  task.vegan = 0;
  task.vegetarian = 0;
  task.nutFree = 0;
  task.otherDietaryNotes = "";
  task.recipeLink = "";

  return task;
}
