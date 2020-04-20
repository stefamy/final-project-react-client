import {
  CREATE_ASSIGNMENT,
  FIND_ALL_ASSIGNMENTS,
  UPDATE_ASSIGNMENT
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
export const updateAssignment = (assignment) => ({
  type: UPDATE_ASSIGNMENT,
  invite: assignment
})


export default {
  createAssignment,
  findAllAssignments,
  updateAssignment
}
