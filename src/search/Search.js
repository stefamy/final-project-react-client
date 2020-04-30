import React from "react";
import { connect } from 'react-redux'
import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"

const getQueryTerm  = (query)  => {
  return query.substring(1);
}

const Search = ({ pathname, search, hash}) =>
    <div className="mb-5 p-5 bg-white hero-unit rounded border">
      <h1>Search</h1>
      <SearchBar />
      {search ? <SearchResults queryTerm={getQueryTerm(search)}/> : ''}
      <div>
        pathname: {pathname}
      </div>
      <div>
        hash: {getQueryTerm(hash)}
      </div>
    </div>


const mapStateToProps = state => ({
  pathname: state.router.location.pathname,
  search: state.router.location.search,
  hash: state.router.location.hash
})

export default connect(mapStateToProps)(Search)
