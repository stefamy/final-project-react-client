import {
  CREATE_ASSIGNMENT,
  FIND_ALL_ASSIGNMENTS,
  FIND_ALL_ASSIGNMENTS_FOR_EVENT,
  UPDATE_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  UPDATE_ASSIGNMENT_FOR_EVENT, DELETE_ASSIGNMENT_FOR_EVENT
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
export const updateAssignmentForEvent = (assignment) => ({
  type: UPDATE_ASSIGNMENT_FOR_EVENT,
  assignment: assignment
})



// READ
export const deleteAssignment = (assignmentId) => ({
  type: DELETE_ASSIGNMENT,
  assignmentId: assignmentId
})


// READ
export const deleteAssignmentForEvent = (assignmentId) => ({
  type: DELETE_ASSIGNMENT_FOR_EVENT,
  assignmentId: assignmentId
})



export default {
  createAssignment,
  findAllAssignments,
  findAllAssignmentsForEvent,
  updateAssignment,
  updateAssignmentForEvent,
  deleteAssignment,
  deleteAssignmentForEvent
}
