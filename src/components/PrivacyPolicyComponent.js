import React from "react";

const PrivacyPolicyComponent = ({ props }) => {

  return (
      <div className="row align-items-center justify-content-center">
        <div className="bg-white border p-4 col-lg-7 col">
            <h1>Privacy Policy</h1>
            <p>This application was built for educational and entertainment purposes only.</p>
            <p>We do not collect analytics or sell any data that is provided.</p>

            <h2>Your Personal Information</h2>
            <p>We require some information in order to set up an account: A unique username, a unique email address, and a password. The username will be public to all other users and non-users browsing the site. The email address will not be shared with any other users, unless you are both invitees to a mutual event.</p>

          <h2>Your Event Information</h2>
            <p>Information regarding the address, event location and times, and other details are collected only for the purpose of event planning. Limited amounts of this information is available to other users (for example, they can see your city and state but not your street address). If you have a invite to your event, that user will be able to use the location of the event.</p>
            <p>Thank you for visiting the Potluck Party Planner App.</p>
        </div>
        </div>
  );

}

export default PrivacyPolicyComponent;
