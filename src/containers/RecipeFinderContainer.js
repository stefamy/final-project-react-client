import {Link} from "react-router-dom";
import React from "react";


/**
 * @param {{queryText:string}} queryText
 * @param {{recipeId:string}} recipeId
 */
export default class RecipeFinderContainer extends React.Component {


  render() {
    return (
        <div>
          <p>Wondering what to bring to your next party?</p>
          <p><Link to="/search">Search for recipes</Link></p>
          <p><Link to="/login">Log in to</Link> or <Link to="/register">register a new</Link> account.</p>
        </div>
    );
    }

  }

