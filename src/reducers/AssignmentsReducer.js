import {
  CREATE_ASSIGNMENT,
  FIND_ALL_ASSIGNMENTS,
  FIND_ALL_ASSIGNMENTS_FOR_EVENT,
  UPDATE_ASSIGNMENT,
  UPDATE_ASSIGNMENT_FOR_EVENT
} from "../common/AssignmentsConstants";
import _ from 'lodash';

const initialState = {
  assignments: [],
  eventAssignments: []
}

const assignmentsReducer = (state = initialState, action) => {
  let assignments, eventAssignments;
  switch (action.type) {

    case CREATE_ASSIGNMENT:
      eventAssignments = [...state.eventAssignments];
      eventAssignments.push(action.assignment);

      return {
        eventAssignments: eventAssignments
      }

    case FIND_ALL_ASSIGNMENTS:
      assignments = _.sortBy(action.assignments, 'type')
      return {
        assignments: assignments
      }

    case FIND_ALL_ASSIGNMENTS_FOR_EVENT:
      eventAssignments = _.sortBy(action.assignments, 'type')
      return {
        eventAssignments: eventAssignments
      }

    case UPDATE_ASSIGNMENT:
      assignments = [...state.assignments];
      const indexToUpdate = _.findIndex(assignments, {id: action.assignment.id});
      assignments.splice(indexToUpdate, 1, action.assignment);

      return {
        assignments: _.cloneDeep(assignments)
      }

    case UPDATE_ASSIGNMENT_FOR_EVENT:
      eventAssignments = [...state.eventAssignments];
      const indexInEventList = _.findIndex(eventAssignments, {id: action.assignment.id});
      eventAssignments.splice(indexInEventList, 1, action.assignment);

      return {
        eventAssignments: _.cloneDeep(eventAssignments)
      }


    default:
      return state
  }
}

export default assignmentsReducer;

