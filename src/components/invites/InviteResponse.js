import React from "react";
import {Link} from "react-router-dom";

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

const InviteResponse = ({ invite, deleteInvite }) => {

  return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            {invite.guest.accountClaimed === 1 &&
            <Link to={`profile/` + invite.guest.username}>{invite.firstName} {invite.lastName}</Link>
            }
            {invite.guest.accountClaimed !== 1 && <>
              {invite.firstName} {invite.lastName}
            </>}
            <span className={`ml-3 badge badge-pill ` + badgeClass(invite.response)}>{invite.response}</span>
          </div>
          <div>
            <a href={`mailto:` + invite.email} className="btn"><i className="fa fa-envelope text-primary"></i></a>
            <button className="btn" type="submit" onClick={() => deleteInvite(invite.id)}><i className="text-danger fa fa-close"></i></button>
          </div>
        </li>
  );

}

export default InviteResponse;
