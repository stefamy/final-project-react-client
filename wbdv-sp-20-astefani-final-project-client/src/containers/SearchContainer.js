import React from 'react'




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
          <div className="row">
            <div className="col-4">
              <h3>Recipe Finder Tool</h3>
              <form className="search-form" onSubmit={(e) => this.submitQuery(e)}>
                <input className="form-control" type="text" value={this.state.queryText} placeholder="Search for recipes..."
                 onChange={e => this.handleChange(e)}/>
                  <button type="button" className="btn btn-primary" onClick={(e) => this.submitQuery(e)}>Search</button>
              </form>
            </div>
            <div className="col-8"></div>
          </div>
    );
  }

}


