import React from "react";

function round_to_precision(x, precision) {
  var y = +x + (precision === undefined ? 0.5 : precision/2);
  return y - (y % (precision === undefined ? 1 : +precision));
}


const RecipeCard = ({ title, image, time, servings, ingredients, instructions, courses}) => (
        <div className="card">
          <img className="card-img-top" src={image} alt='' />

          <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <div className="recipe-prep-time">Ready in: {time} minutes</div>
             <div className="recipe-servings">Yields: {servings} servings</div>

                  <ul className="recipe-ingredients">
                    {ingredients && ingredients.map((item, index) =>
                        <li key={index}>
                          <span className="ingred-quantity">{round_to_precision(item.amount, 0.25)} </span>
                          <span className="ingred-unit">{item.unit} </span>
                          <span className="ingred-name">{item.name}</span>
                        </li>
                    ) }
                  </ul>
                  <div className="recipe-instructions">
                    <ol className="recipe-instructions">
                      {instructions && instructions.length > 0 && instructions[0].steps && instructions[0].steps.map((instruction, index) =>
                        <li key={index}>
                          {instruction.step}
                        </li>
                      )}
                    </ol>
                  </div>

            { courses &&
            <div>
              <ul className="recipe-tags row">
                {courses.map((course, index) =>
                    <li className="col-sm-auto" key={index}><span
                        className="recipe-course">{course}</span></li>
                )
                }
              </ul>
            </div>
            }
          </div>
        </div>


);

export default RecipeCard;
