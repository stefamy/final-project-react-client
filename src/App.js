import React from "react";
import {connect} from "react-redux";
import userService from "./services/UserService";
import userActions from "./actions/UserActions";
import routes from './routes'

class App extends React.Component {

  state = {
    isLoading: true
  }

  doneLoading() {
    this.setState({isLoading: false})
  }
  componentDidMount() {
    this.props.findCurrentUserDataStore(() => this.doneLoading());
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  render() {
    return (
          <div className={`container-all bg-pattern ${this.state.isLoading ? 'loading' : 'loaded'}`}>
            { routes }
          </div>
    )
  }
}


const stateToPropertyMapper = state => {
  return {
    user: state.user.user
  };
};


const dispatchToPropertyMapper = dispatch => {
  return {
    findCurrentUserDataStore: (doneLoading) => {
      userService.findCurrentUserDataStore().then(userData => {
        if (userData) {
          dispatch(userActions.findCurrentUserDataStore(userData));
        }
        doneLoading();
      });
    },
  };
};

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(App);
