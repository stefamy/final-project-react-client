import React from "react";

function badgeClass(response) {
  switch (response) {
    case "Yes":
      return 'badge-success';
    case "No":
      return 'badge-secondary';
    case "Pending":
      return 'badge-primary';
    case "Maybe":
      return 'badge-warning';
    default:
      return 'badge-warning';
  }
}

const InviteResponse = ({ invite, event }) => {

  return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <span>{invite.firstName} {invite.lastName}
            <a href={`mailto:` + invite.email}><i className="ml-2 fa fa-envelope"> </i></a>
          </span>
          <span className={`badge badge-pill ` + badgeClass(invite.response)}>{invite.response}</span>
        </li>
  );

}

export default InviteResponse;
