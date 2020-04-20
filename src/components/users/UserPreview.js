import React from "react";

const UserPreview = ({ user }) => {

    return (
        <>
          <div>
            <div>First name: {user.firstName}</div>
            <div>Username: {user.username}</div>
          </div>
        </>
    );

}

export default UserPreview;
