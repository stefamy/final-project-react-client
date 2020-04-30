import React from "react";
import {Link} from "react-router-dom";

const Card = ({header, title, text, linkUrl, linkText, cta}) =>
    <div className="card">
      {header && <h5 className="card-header">{header}</h5> }
      <div className="card-body">
        {title && <h5 className="card-title">{title}</h5> }
        {text && <p className="card-text">{text}</p> }
        {cta}
        {linkUrl && <Link to={linkUrl} className="btn btn-outline-info">{linkText || linkUrl}</Link>}
      </div>
    </div>


export default Card;
