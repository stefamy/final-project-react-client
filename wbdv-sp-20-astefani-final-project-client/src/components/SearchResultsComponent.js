import React from "react";
import RecipeResult from "./RecipeResult";
import {EDAMAM_API_KEY, EDAMAM_APP_ID, SAMPLE_RESPONSE} from "../common/constants";



export default class SearchResultsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.results = JSON.parse(SAMPLE_RESPONSE);
    this.count = this.results.hits.length;
  }

  createCORSRequest(method, url) {
    let xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open(method, url, true);
    }
    else {
      // CORS not supported.
      xhr = null;
    }
    return xhr;
  }

  // Make the actual CORS request.
  makeCorsRequest(queryText) {

    const url = "https://api.edamam.com/search?q=" + queryText + "&app_id="
        + EDAMAM_APP_ID + '&app_key=' + EDAMAM_API_KEY;

    const xhr = this.createCORSRequest('GET', url);
    if (!xhr) {
      alert('CORS not supported');
      return;
    }

    const self = this;

    // Response handlers.
    xhr.onload = function(self) {
      const text = xhr.responseText;
      const response = JSON.parse(text);
      self.results = response.hits;
      self.count = response.count;
      console.table('results:', response);
    };

    xhr.onerror = function () {
      alert('Woops, there was an error making the request.');
    };


    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(queryText);



  }

  // displayResults(jsonResponse) {
  //   self.setState({
  //     results: jsonResponse.hits,
  //     count: jsonResponse.count
  //   });
  //
  // }



  componentDidMount() {
     //this.makeCorsRequest(this.props.queryText);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps !== this.props) {
    //   this.makeCorsRequest(this.props.queryText);
    //   console.log('updated and i did run');
    // }
    // console.log('updated didnt run');
  }


    render() {
    return (
        <div>
          <h2>Search term: {this.props.queryText}</h2>
          <p>{this.count} results found.</p>

            <ul className="nav nav-tabs">
            {this.results &&
              this.results.hits.map((hit, index) => (
                  <RecipeResult
                      key={index}
                      recipeData={hit}
                  />
              ))}
          </ul>
        </div>
    );
  }
}
