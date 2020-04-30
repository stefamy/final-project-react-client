import React from 'react'
import {push} from "connected-react-router";
import {connect} from "react-redux";


class SearchBar extends React.Component {

  state = {
    query: ''
  }

  handleSubmitQuery(e) {
    e.preventDefault();
    this.props.submitQuery(this.state.query);
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  render() {
    return (
        <form className="search-form"
              onSubmit={(e) => this.handleSubmitQuery(e)}>
          <input className="form-control" type="text" value={this.state.query} placeholder="Search for recipes..."
                 onChange={e => this.handleChange(e)}/>
          <button type="button" className="btn btn-info">Search</button>
        </form>
    )
  }
}

const stateToPropertyMapper = state => {
  return { };
};

const dispatchToPropertyMapper = dispatch => {
  return {
    submitQuery: (query) => {
      dispatch(push('/search?' + query));
    }
  }
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(SearchBar);
