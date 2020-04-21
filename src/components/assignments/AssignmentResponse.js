import React from "react";

function badgeClass(status) {
  switch (status) {
    case "Assigned":
      return 'badge-success';
    case "Unassigned":
      return 'badge-warning';
    default:
      return 'badge-warning'
  }
}

function typeClass(type) {
  switch (type) {
    case "FOOD":
      return 'fas fa-utensils';
    case "PREP":
      return 'fas fa-pencil-ruler';
    case "SETUP":
      return 'fas hard-hat';
    case "CLEANUP":
      return 'fas fa-broom'
    default:
      return 'badge-warning'
  }
}

const AssignmentResponse = ({ assignment, event }) => {

  return (
      <li className="list-group-item d-flex justify-content-between align-items-center">
        <span><i className={`fa ` + typeClass(assignment.type)}></i>
            {assignment.title} {assignment.description}</span>
        <span className={`badge badge-pill ` + badgeClass(assignment.status)}>{assignment.status}</span>
      </li>
  );

}

export default AssignmentResponse;
