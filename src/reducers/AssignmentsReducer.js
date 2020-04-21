import {
  CREATE_ASSIGNMENT,
  FIND_ALL_ASSIGNMENTS,
  UPDATE_ASSIGNMENT
} from "../common/AssignmentsConstants";
import _ from 'lodash';

const initialState = {
  assignments: []
}

const assignmentsReducer = (state = initialState, action) => {
  let assignments;
  switch (action.type) {

    case CREATE_ASSIGNMENT:
      assignments = [...state.assignments];
      assignments.push(action.assignments);

      return {
        assignments: assignments
      }

    case FIND_ALL_ASSIGNMENTS:
      assignments = _.sortBy(action.assignments, 'date')
      return {
        assignments: assignments
      }

    case UPDATE_ASSIGNMENT:
      assignments = [...state.assignments];
      const indexToUpdate = _.findIndex(assignments, {id: action.assignment.id});
      assignments.splice(indexToUpdate, 1, action.assignment);

      return {
        assignments: _.cloneDeep(assignments)
      }

    default:
      return state
  }
}

export default assignmentsReducer;

