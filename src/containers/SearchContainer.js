import React from 'react'
import SearchBarComponent from "../components/SearchBarComponent";



export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryText: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      queryText: e.target.value
    })
  }

  submitQuery(e) {
    e.preventDefault();
    this.props.history.push(`results/${this.state.queryText}`);
  }



  render() {
    return (
          <div className="bg-white border rounded p-3 col-auto">
              <h3>Recipe Finder Tool</h3>
              <SearchBarComponent
                  history={this.props.history}
              />
          </div>
    );
  }

}


