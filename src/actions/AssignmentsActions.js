import {
  CREATE_ASSIGNMENT,
  FIND_ALL_ASSIGNMENTS,
  FIND_ALL_ASSIGNMENTS_FOR_EVENT,
  UPDATE_ASSIGNMENT,
  DELETE_ASSIGNMENT
} from "../common/AssignmentsConstants";


// CREATE
export const createAssignment = (assignment) => ({
  type: CREATE_ASSIGNMENT,
  assignment: assignment
})

// READ
export const findAllAssignments = (assignments) => ({
  type: FIND_ALL_ASSIGNMENTS,
  assignments: assignments
})


// READ
export const findAllAssignmentsForEvent = (assignments) => ({
  type: FIND_ALL_ASSIGNMENTS_FOR_EVENT,
  assignments: assignments
})

// READ
export const updateAssignment = (assignment) => ({
  type: UPDATE_ASSIGNMENT,
  assignment: assignment
})


// READ
export const deleteAssignment = (assignment) => ({
  type: DELETE_ASSIGNMENT,
  assignment: assignment
})


export default {
  createAssignment,
  findAllAssignments,
  findAllAssignmentsForEvent,
  updateAssignment,
  deleteAssignment
}
