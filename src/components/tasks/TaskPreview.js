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

const TaskPreview = ({ outerWrapClass, headerText, task }) => {

  return (
      <div className={outerWrapClass}>
        <div className="card">
          <h5 className="card-header">{headerText}</h5>
          <div className="card-body">
            <h5 className="card-title">{task.type || 'Task'}: {task.title}</h5>
            <p className="card-subtitle pb-3">{task.description}</p>
            <Link to={`tasks`} className="btn btn-info">Go to tasks</Link>
          </div>
          </div>
      </div>
  );

}

export default TaskPreview;
