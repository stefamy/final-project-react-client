import React from 'react'
// import SearchResultsComponent from '../components/SearchResultsComponent';



class SearchContainer extends React.Component {
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

  sendQuery(e) {
    e.preventDefault();
    this.props.history.push(`queryResults/${this.state.queryText}`);
  }


  render() {
    return (
        <div>
          <form onSubmit={this.sendQuery}>
          <input type="text" value={this.state.queryText} placeholder="Search for recipes..."
                 onChange={e => this.handleChange(e)}/>
            <button onClick={(e) => this.sendQuery(e)}>Search</button>
          </form>

          <div id="queryTerm"></div>
          <div id="numResults"></div>
          <div id="results"></div>


          </div>
    );
  }

}

export default SearchContainer;

