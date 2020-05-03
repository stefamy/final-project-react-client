import React from "react";
import {Link} from "react-router-dom";

const TaskPreview = ({ outerWrapClass, headerText, task }) => {

  return (
      <div className={outerWrapClass}>
        <div className="card">
          <h5 className="card-header">{headerText}</h5>
          <div className="card-body">
            <h5 className="card-title">{task.title}</h5>
            <p className="card-subtitle pb-3">{task.description}</p>
            <Link to="tasks" className="btn btn-info">Go to tasks</Link>
          </div>
          </div>
      </div>
  );

}

export default TaskPreview;
