import React from 'react'
// import SearchResultsComponent from '../components/SearchResultsComponent';




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
    this.props.history.push(`queryResults/${this.state.queryText}`);
  }



  render() {
    return (
          <div class="row">
            <div class="col-4">
              <form class="search-form" onSubmit={(e) => this.submitQuery(e)}>
                <input class="form-control" type="text" value={this.state.queryText} placeholder="Search for recipes..."
                 onChange={e => this.handleChange(e)}/>
                  <button type="button" class="btn btn-primary" onClick={(e) => this.submitQuery(e)}>Search</button>
              </form>
            </div>
            <div class="col-8"></div>
          </div>
    );
  }

}


