import { CREATE_ASSIGNMENT, FIND_ALL_ASSIGNMENTS } from "../common/AssignmentsConstants";


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

export default {
  createAssignment,
  findAllAssignments
}
