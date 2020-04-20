import { CREATE_ASSIGNMENT, FIND_ALL_ASSIGNMENTS } from "../common/AssignmentsConstants";
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

    default:
      return state
  }
}

export default assignmentsReducer;

