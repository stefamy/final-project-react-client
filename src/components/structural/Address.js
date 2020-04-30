import React from "react";

const Address = ({name, street1, street2, city, state, zip, notes}) =>
    <p>
      {name && <span>{name}<br/></span>}
      {street1 && <span>{street1}<br/></span>}
      {street2 && <span>{street2}<br/></span>}

      {city && state && <span>{city}, {state} {zip}<br/></span>}
      {city && !state && <span>{city} {zip}<br/></span>}

      {notes && <span>{notes}</span>}
    </p>


export default Address;
