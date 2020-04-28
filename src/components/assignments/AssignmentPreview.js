import React from "react";
import {Link} from "react-router-dom";

// function badgeClass(response) {
//   switch (response) {
//     case "Yes":
//       return 'badge-success';
//     case "No":
//       return 'badge-secondary';
//     case "Pending":
//       return 'badge-info';
//     case "Maybe":
//       return 'badge-warning';
//     default:
//       return 'badge-warning';
//   }
// }

const AssignmentPreview = ({ outerWrapClass, headerText, assignment }) => {

  return (
      <div className={outerWrapClass}>
        <div className="card">
          <h5 className="card-header">{headerText}</h5>
          <div className="card-body">
            <h5 className="card-title">
              {assignment.type || 'Task'}: {assignment.title}</h5>
            <div className="pb-2">{assignment.description}</div>
            <Link to={`assignments`} className="btn btn-outline-info">Go to assignments</Link>
          </div>
          </div>
      </div>
  );

}

export default AssignmentPreview;
