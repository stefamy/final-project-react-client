import React from "react";


const FooterComponent = ({ props }) => {

  return (
      <div className="container-fluid bg-white border pt-2 pb-3">
        <div className="container text-center">
            <ul className="nav navbar-nav d-flex text-center flex-row align-items-center justify-content-center">
            <li><a href="/privacy" className={`nav-link btn text-info`}>Privacy Policy</a></li>
            </ul>
          <div>Amy Stefani | CS 5610 Web Development</div>
        </div>
      </div>
        );

}

export default FooterComponent;
